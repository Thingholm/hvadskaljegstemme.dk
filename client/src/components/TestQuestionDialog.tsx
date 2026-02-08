import { ThumbsDown, ThumbsUp, X } from "lucide-react";
import type { Bill } from "../lib/types/bill";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function TestQuestionDialog({
    bill,
    closeDialog,
}: Readonly<{
    bill: Bill;
    closeDialog: () => void;
}>) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={closeDialog}/>
            <div className="bg-white relative m-4 p-6 rounded-lg shadow-lg max-w-md w-full z-10 grid gap-2">
                <button onClick={closeDialog} className="absolute top-4 right-4 p-2"><X/></button>
                <Badge>{bill.bill_tag}</Badge>
                <h3 className="text-xl font-bold">{bill.title}</h3>
                <p className="text-sm text-gray-500">Afstemning: {bill.vote_date}</p>
                <p>{bill.description}</p>
                <Button variant="mobileText" to={bill.url} target="_blank">
                    Læs lovforslaget her
                </Button>
                <div className="grid gap-4 mt-2">
                    <div>
                        <p className="flex items-center gap-3 mb-2">
                            <ThumbsUp className="text-green-600" size={20}/>
                            <span className="font-medium">Argumenter for</span>
                        </p>
                        <p>{bill.for_description}</p>
                    </div>
                    <div>
                        <p className="flex items-center gap-3 mb-2">
                            <ThumbsDown className="text-red-600" size={20}/>
                            <span className="font-medium">Argumenter imod</span>
                        </p>
                        <p>{bill.against_description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}