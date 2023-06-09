"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();
    let toastPostID: string = "toastPostID";

    //Create a post
    const { mutate } = useMutation(async (title: string) => await axios.post("/api/posts/addPost", { title }), {
        onError: (error: any) => {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message, { id: toastPostID });
            }
            setIsDisabled(false);
        },
        onSuccess: () => {
            toast.success("Post has been made 🔥", { id: toastPostID });
            queryClient.invalidateQueries(["posts"]);
            setTitle("");
            setIsDisabled(false);
        },
    });
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        toastPostID = toast.loading("Creating your post", { id: toastPostID });

        mutate(title);
    };
    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4 rounded-md">
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="What's on your mind"
                    className="p-4 rounded-md text-lg my-2 bg-gray-200"
                ></textarea>
            </div>
            <div className=" flex items-center justify-between gap-2">
                <p
                    className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
                >{`${title.length}/300`}</p>
                <button
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    disabled={isDisabled}
                    type="submit"
                >
                    Create a post
                </button>
            </div>
        </form>
    );
}
