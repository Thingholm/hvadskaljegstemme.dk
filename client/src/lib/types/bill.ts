export type Bill = {
    id: number;
    bill_tag: string;
    title: string;
    question: string;
    description: string;
    for_description: string;
    against_description: string;
    url: string;
    vote_date: string;
    is_passed: boolean;
};