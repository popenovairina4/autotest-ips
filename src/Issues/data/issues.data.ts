type IssueData = {
    comment: string,
    description: string,
    title: string,
    url: string,
}

const images: Array<{ path: string, name: string }> = [{
    path: '/Users/irina/autotests/autotest-ips/src/common/foto/пион.jpg',
    name: 'pion',
}, {
    path: '/Users/irina/autotests/autotest-ips/src/common/foto/bird.jpg',
    name: 'bird',
}, {
    path: '/Users/irina/autotests/autotest-ips/src/common/foto/ромашка.jpg',
    name: 'romashka',
}]

const issueData: IssueData = {
    comment: 'My comment',
    description: 'Прекрасное пленяет навсегда...',
    title: 'Be one',
    url: ''
}

export {
    IssueData,
    images,
    issueData
}