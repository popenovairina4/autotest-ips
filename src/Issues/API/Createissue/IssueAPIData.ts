type CreateIssueRequest = {
    owner: string,
    repo: string,
    title: string,
    labels?: string[],
}

export {
    CreateIssueRequest
}