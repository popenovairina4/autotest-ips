type IssueData = {
    comment: string,
    description: string,
    title: string,
    url: string,
}

const images: Array<{ url: string, name: string }> = [{
    url: 'https://raw.githubusercontent.com/popenovairina4/autotest-ips/refs/heads/main/src/common/foto/%D0%BF%D0%B8%D0%BE%D0%BD.jpg',
    name: 'pion',
}, {
    url: 'https://raw.githubusercontent.com/popenovairina4/autotest-ips/refs/heads/main/src/common/foto/bird.jpg',
    name: 'bird',
}, {
    url: 'https://raw.githubusercontent.com/popenovairina4/autotest-ips/refs/heads/main/src/common/foto/%D1%80%D0%BE%D0%BC%D0%B0%D1%88%D0%BA%D0%B0.jpg',
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