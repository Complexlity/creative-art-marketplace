export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bids: {
        Row: {
          amount: number;
          created_at: string;
          id: number;
          slug: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          slug: string;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          slug?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bids_slug_fkey";
            columns: ["slug"];
            isOneToOne: false;
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "bids_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      comment_votes: {
        Row: {
          comment: number;
          created_at: string;
          id: number;
          type: string;
          voter_id: string;
        };
        Insert: {
          comment: number;
          created_at?: string;
          id?: number;
          type: string;
          voter_id: string;
        };
        Update: {
          comment?: number;
          created_at?: string;
          id?: number;
          type?: string;
          voter_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_fkey";
            columns: ["comment"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comment_votes_voter_id_fkey";
            columns: ["voter_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          downvotes: string[] | null;
          id: number;
          slug: string;
          upvotes: string[] | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          downvotes?: string[] | null;
          id?: number;
          slug: string;
          upvotes?: string[] | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          downvotes?: string[] | null;
          id?: number;
          slug?: string;
          upvotes?: string[] | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_slug_fkey";
            columns: ["slug"];
            isOneToOne: false;
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      messages: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          status: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          status?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      nft_likes: {
        Row: {
          created_at: string;
          id: number;
          nft_slug: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          nft_slug: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          nft_slug?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nft_likes_nft_slug_fkey";
            columns: ["nft_slug"];
            isOneToOne: false;
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "nft_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      nft_views: {
        Row: {
          created_at: string;
          id: number;
          nft_slug: string;
          views_count: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          nft_slug: string;
          views_count: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          nft_slug?: string;
          views_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "nft_views_nft_slug_fkey";
            columns: ["nft_slug"];
            isOneToOne: true;
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          }
        ];
      };
      nfts: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          end_date: string | null;
          id: number;
          image: string;
          name: string;
          price: number;
          sale_type: string | null;
          slug: string;
          start_date: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          end_date?: string | null;
          id?: number;
          image: string;
          name: string;
          price: number;
          sale_type?: string | null;
          slug: string;
          start_date?: string | null;
          status?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          end_date?: string | null;
          id?: number;
          image?: string;
          name?: string;
          price?: number;
          sale_type?: string | null;
          slug?: string;
          start_date?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nfts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          amount: number;
          balance_change: number;
          created_at: string;
          id: number;
          name: string;
          read_status: string;
          status: string;
          type: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          balance_change: number;
          created_at?: string;
          id?: number;
          name: string;
          read_status?: string;
          status: string;
          type: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          balance_change?: number;
          created_at?: string;
          id?: number;
          name?: string;
          read_status?: string;
          status?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          game_currency: number;
          id: number;
          imageUrl: string;
          user_id: string;
          user_url: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          game_currency: number;
          id?: number;
          imageUrl: string;
          user_id: string;
          user_url: string;
          username: string;
        };
        Update: {
          created_at?: string;
          game_currency?: number;
          id?: number;
          imageUrl?: string;
          user_id?: string;
          user_url?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      getmintpercentagecost: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      mint_nft: {
        Args: {
          _name: string;
          _price: number;
          _image: string;
          _user_id: string;
          _description: string;
          _category: string;
          _slug: string;
          _sale_type: string;
          _start_date: string;
          _end_date: string;
        };
        Returns: {
          name: string;
          price: number;
          image: string;
          user_id: string;
          description: string;
          category: string;
          slug: string;
          sale_type: string;
          start_date: string;
          end_date: string;
        }[];
      };
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      return_setof_trade_table: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["CompositeTypes"]["trade_record"][];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      trade_record: {
        slug: string;
        seller: string;
        name: string;
        amount: number;
        buyer: string;
        bid_id: number;
      };
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
