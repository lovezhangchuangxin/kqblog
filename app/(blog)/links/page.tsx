import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '友情链接',
  description: '优质博客和网站推荐',
};

const friends = [
  {
    name: '示例友链1',
    url: 'https://example.com',
    avatar: '/images/friends/default.png',
    description: '这是一个示例友链描述',
  },
  {
    name: '示例友链2',
    url: 'https://example2.com',
    avatar: '/images/friends/default.png',
    description: '另一个示例友链描述',
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">友情链接</h1>
        <p className="text-muted-foreground mb-8">
          以下是我推荐的一些优质博客和网站
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {friends.map((friend) => (
            <a
              key={friend.name}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl">
                {friend.name[0]}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {friend.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {friend.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-foreground mb-4">申请友链</h2>
          <p className="text-muted-foreground">
            如果你想和我交换友链，请通过以下方式联系我：
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-2">
            <li>在 GitHub 上提交 Issue</li>
            <li>发送邮件到 your@email.com</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            请提供：网站名称、网站地址、头像链接、网站描述
          </p>
        </div>
      </div>
    </div>
  );
}
