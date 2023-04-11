import "./globals.css";
import Nav from "./auth/Nav";
import { Roboto } from "@next/font/google";
import QueryWrapper from "./auth/QuerryWrapper";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const metadata = {
    description: "Generated by create next app",
    title: "Create Next App",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200`}>
                <QueryWrapper>
                    <Nav />
                    {children}
                </QueryWrapper>
            </body>
        </html>
    );
}
