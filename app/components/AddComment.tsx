"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
    id?: string;
};

type Comment = {
    postId?: string;
    title: string;
};

export default function AddComment({ id }: PostProps) {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let commentToastID: string = "commentToastID";

    const { mutate } = useMutation(async (data: Comment) => axios.post("/api/posts/addComment", { data }), {
        onSuccess: () => {
            queryClient.invalidateQueries(["detail-post"]);
            setTitle("");
            setIsDisabled(false);
            toast.success("Comment added.", { id: commentToastID });
        },
        onError: (error: any) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message, { id: commentToastID });
            }
            setIsDisabled(false);
        },
    });

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        commentToastID = toast.loading("Creating your comment", { id: commentToastID });
        mutate({ title, postId: id });
    };

    return (
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    className="p-4 text-lg rounded-md my-2"
                    value={title}
                />
                <div className="flex items-center gap-2">
                    <button
                        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                        disabled={isDisabled}
                        type="submit"
                    >
                        Add Comment
                    </button>
                    <p
                        className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
                    >{`${title.length}/300`}</p>
                </div>
            </div>
        </form>
    );
}
