CREATE TYPE trade_record AS (
    slug text,
    seller text,
    name text,
    amount int8,
    buyer text,
    bid_id int8
);


create
or replace function return_setof_trade_table()
returns setof trade_record as $$
WITH
expired_nfts AS (
    SELECT
      *
    FROM
      nfts
    WHERE
      sale_type = 'TIMED_AUCTION'
      AND end_date <= to_char(now(), 'YYYY-MM-DD')

 ),
bids_for_expired_nfts AS (
    SELECT
      *
    FROM
      bids
    WHERE
      slug IN (
        SELECT
          slug
        FROM
          expired_nfts
      ) AND status = 'pending'
 ),
trade_table AS (
    SELECT
        expired_nfts.slug AS slug,
        expired_nfts.user_id AS seller,
        expired_nfts.name AS name,
        bids_for_expired_nfts.amount AS amount,
        bids_for_expired_nfts.user_id AS buyer,
        bids_for_expired_nfts.id AS bid_id
    FROM
        expired_nfts
    JOIN
        bids_for_expired_nfts ON expired_nfts.slug = bids_for_expired_nfts.slug
),
updated_bids AS (
    UPDATE bids
    SET status = 'accepted'
    WHERE id IN (SELECT bid_id FROM trade_table)
    RETURNING *
),
updated_user AS(
  UPDATE users
SET game_currency = CASE
    WHEN user_id IN (SELECT buyer FROM trade_table) THEN game_currency - (SELECT SUM(amount) FROM trade_table WHERE buyer = users.user_id)
    WHEN user_id IN (SELECT seller FROM trade_table) THEN game_currency + (SELECT SUM(amount) FROM trade_table WHERE seller = users.user_id)
    ELSE game_currency
END
WHERE user_id IN (SELECT buyer FROM trade_table) OR user_id IN (SELECT seller FROM trade_table)
),new_transactions AS (
    INSERT INTO transactions (type, name, amount, balance_change, user_id, status, read_status)
    SELECT
        'bid',
        trade_table.slug,
        trade_table.amount,
        CASE
            WHEN trade_table.buyer = users.user_id THEN -trade_table.amount
            WHEN trade_table.seller = users.user_id THEN trade_table.amount
        END,
        CASE
            WHEN trade_table.buyer = users.user_id THEN trade_table.buyer
            WHEN trade_table.seller = users.user_id THEN trade_table.seller
        END,
        'accepted',
        'unread'
    FROM
        trade_table
    JOIN
        users ON users.user_id IN (trade_table.buyer, trade_table.seller)
), updated_nfts as (
  UPDATE nfts
SET user_id = (
    SELECT buyer
    FROM trade_table
    WHERE nfts.slug = trade_table.slug
)
WHERE nfts.slug IN (
    SELECT slug
    FROM trade_table
)
)


SELECT * FROM trade_table

$$ language sql;
