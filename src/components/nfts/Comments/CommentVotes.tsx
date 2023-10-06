import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { FC, useEffect, useState } from "react";
import {
  supabaseWithoutClient as supabase,
  supabaseWithClient as supabaseClient,
} from "supabase";
import { cn } from "~/utils/libs";

interface CommentVotesProps {
  commentId: number;
}

type VoteType = "up" | "down";

const CommentVotes: FC<CommentVotesProps> = ({ commentId }) => {
  const queryClient = useQueryClient();
  const { userId, getToken } = useAuth();

  const [myVote, setMyVote] = useState<VoteType | null>(null);
  const [voteCount, setVoteCount] = useState(0);
  const {
    status,
    data: comment_votes,
    error,
  } = useQuery({
    queryKey: [`comment_votes`, commentId],
    queryFn: async () => {
      let { data: votes, error } = await supabase
        .from("comment_votes")
        .select("*")
        .eq("comment", commentId);

      return votes;
    },
  });

  useEffect(() => {
    if (
      status === "success" &&
      comment_votes &&
      userId &&
      comment_votes.length > 0
    ) {
      let vote = null;
      let count = 0;

      for (let i = 0; i < comment_votes.length; i++) {
        const curr = comment_votes[i];
        if (curr.user === userId) {
          vote = curr.type;
        }
        if (curr.type === "up") {
          count += 1;
        } else if (curr.type === "down") {
          count -= 1;
        }
      }
      setMyVote(vote);
      setVoteCount(count);
    }
  }, [status, comment_votes]);

  type VoteUpdateType = {
    newVoteType: VoteType;
    previousVoteType: VoteType | null;
  };

  const { mutate: vote } = useMutation({
    mutationFn: async (data: VoteUpdateType) => {
      const { newVoteType, previousVoteType } = data;
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);

      if (!userId || !supabase) {
        return comment_votes;
      }

      if (previousVoteType) {
        const { data: newVotes, error } = await supabase
          .from("comment_votes")
          .update({ type: newVoteType })
          .eq("user", userId)
          .eq("comment", commentId)
          .select();

        if (error) throw new Error(error.message);
      } else {
        const { data: newVotes, error } = await supabase
          .from("comment_votes")
          .insert({
            type: newVoteType,
            user: userId,
            comment: commentId,
          });
        if (error) throw new Error(error.message);
      }
    },
    onMutate: async ({ newVoteType, previousVoteType }) => {
      const oldVoteCount = voteCount;
      if (newVoteType == previousVoteType) {
        setMyVote(null);
        setVoteCount(voteCount - 1);
        return;
      }
      if (newVoteType === "up") {
        setVoteCount(voteCount + 2);
      }

      if (newVoteType === "down") {
        setVoteCount(voteCount - 2);
      }
      setMyVote(newVoteType);

      return { oldVoteCount };
    },
    onError: (err, { newVoteType, previousVoteType }, context) => {
      setMyVote(previousVoteType);
      setVoteCount(context?.oldVoteCount!);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`comment_votes`, commentId] });
    },
  });

  if (!comment_votes) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Upvote button */}
      <ArrowBigUp
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[115%] hover:text-green-400":
            userId,
          "fill-green-400 text-green-400 hover:!scale-[100%]": myVote === "up",
        })}
        onClick={() => {
          if (userId) {
            vote({
              newVoteType: "up",
              previousVoteType: myVote,
            });
          }
        }}
      />
      {/* Count */}
      {voteCount}
      {/* Downvote button */}
      <ArrowBigDown
        className={cn({
          "cursor-pointer transition-all duration-75 hover:scale-[110%] hover:text-red-400":
            userId,
          "fill-red-400 text-red-400 hover:!scale-[100%]": myVote === "down",
        })}
        onClick={() => {
          if (userId) {
            vote({
              newVoteType: "down",
              previousVoteType: myVote,
            });
          }
        }}
      />
    </div>
  );
};

export default CommentVotes;
