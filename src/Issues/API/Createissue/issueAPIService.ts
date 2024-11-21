type Issue = {
    id: number,
    number: number,
    labels: IssueLabel[],
    html_url: string,
}

type IssueLabel = {
    id: number,
    url: string,
    name: string,
}

export {
    Issue,
    IssueLabel,
}