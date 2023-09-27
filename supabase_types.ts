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
          message_status: string | null;
          slug: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id?: number;
          message_status?: string | null;
          slug: string;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: number;
          message_status?: string | null;
          slug?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bids_slug_fkey";
            columns: ["slug"];
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "bids_user_id_fkey";
            columns: ["user_id"];
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
            referencedRelation: "nfts";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
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
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      nfts: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          id: number;
          image: string;
          name: string;
          price: number;
          slug: string;
          user_id: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          id?: number;
          image: string;
          name: string;
          price: number;
          slug: string;
          user_id: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          id?: number;
          image?: string;
          name?: string;
          price?: number;
          slug?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nfts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: number;
          imageUrl: string;
          user_id: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          imageUrl: string;
          user_id: string;
          username: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          imageUrl?: string;
          user_id?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
