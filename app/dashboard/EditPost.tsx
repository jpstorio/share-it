"use client";

import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

type EditProps = {
    id: string;
    avatar: string;
    name: string;
    title: string;
    comments?: {
        id: string;
        postId: string;
        userId: string;
    }[];
};

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
    let deleteToastID: string = "toastDeleteID";
    const [toggle, setToggle] = useState(false);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(async (id: string) => await axios.delete("/api/posts/deletePost", { data: id }), {
        onError: (error: any) => {
            toast.error("Error Deleting Post", { id: deleteToastID });
        },
        onSuccess: (data: any) => {
            toast.success("Post has been deleted", { id: deleteToastID });
            queryClient.invalidateQueries(["authPosts"]);
        },
    });

    const deletePost = () => {
        deleteToastID = toast.loading("Deleting your post", { id: deleteToastID });
        mutate(id);
    };

    return (
        <>
            <div className="bg-white my-8 p-8 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image width={32} height={32} src={avatar} alt="avatar" className="rounded-full" />
                    <h3 className="font-bold text-gray-700">{name}</h3>
                </div>
                <div className="my-8">
                    <p className="break-all">{title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
                    <button
                        onClick={(e) => {
                            setToggle(true);
                        }}
                        className="text-sm font-bold text-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    );
}
