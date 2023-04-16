"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostsType } from "./types/Posts";

//Fetch posts
const allPosts = async () => {
    const response = await axios.get("/api/posts/getPosts");
    return response.data;
};

export default function Home() {
    const { data, error, isLoading } = useQuery<PostsType[]>({ queryFn: allPosts, queryKey: ["posts"] });

    return (
        <main>
            <>
                {error && error}
                {isLoading && "Loading..."}
            </>
            <AddPost />
            {data?.map((post: any) => {
                return (
                    <Post
                        comments={post.Comment}
                        key={post.id}
                        name={post.user.name}
                        avatar={post.user.image}
                        postTitle={post.title}
                        id={post.id}
                    />
                );
            })}
        </main>
    );
}
