type IssueData = {
    comment: string,
    description: string,
    title: string,
    url: string,
}

const imagePath: string[] = [
    '/Users/irina/autotests/autotest-ips/src/common/foto/пион.jpg',
    '/Users/irina/autotests/autotest-ips/src/common/foto/bird.jpg',
    '/Users/irina/autotests/autotest-ips/src/common/foto/ромашка.jpg',
]

const issueData: IssueData = {
    comment: 'My comment',
    description: 'Прекрасное пленяет навсегда...',
    title: 'Be one',
    url: ''
}

export {
    IssueData,
    imagePath,
    issueData
}