// ==UserScript==
// @name         NovelAI 界面汉化
// @namespace    novelai-zh
// @version      0.2.1
// @description  把 NovelAI 的界面文字翻译成中文，不动故事正文和输入框
// @match        https://novelai.net/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // ========== 对照表：整句精确匹配 ==========
  const DICT = {
    // ---- 通用 / 菜单 ----
    'Dashboard': '主页',
    'Account': '账户',
    'Account Settings': '账户设置',
    'Logout': '退出登录',
    'Other': '其他',
    'Explore': '探索',
    'Image Generation': '图像生成',
    'Text Generation': '文本生成',
    'Tokenizer': '分词器',
    'User Scripts': '用户脚本',
    'Help': '帮助',
    'Tutorial': '教程',
    'Interactive Tutorials': '互动教程',
    'Documentation': '文档',
    'NovelAI Discord': 'NovelAI Discord',
    'Quick Start Gallery': '快速开始画廊',
    'Director Tools': '导演工具',
    'Opus Usage Limit': 'Opus 用量限制',
    'Inventory': '物品栏',
    'Author': '作者',
    'Opus Tier': 'Opus 档位',
    'History': '历史记录',
    'Copied!': '已复制！',
    'Confirm': '确认',
    'Delete': '删除',
    'Delete All': '全部删除',
    'Import': '导入',
    'Export': '导出',
    'Enabled': '已启用',
    'Default': '默认',
    'empty': '空',
    'There are issues connecting to the backend right now, please check your connection or try again...':
      '目前连接后端出现问题，请检查网络或稍后重试……',

    // ---- 首页 / 新建故事 ----
    'Welcome back, Author': '欢迎回来，作者',
    'Continue a Story': '继续故事',
    'New Story': '新故事',
    'New Shelf': '新书架',
    'Import File': '导入文件',
    'Latest News': '最新消息',
    'Read More': '阅读更多',
    'Manage Account': '管理账户',
    'Next, what kind of experience do you want to have?': '接下来，你想要哪种体验？',
    'Storyteller': '讲故事模式',
    'Write alongside the AI to flesh out your writing and ideas.': '和 AI 一起写作，充实你的文字和想法。',
    'Text Adventure': '文字冒险',
    'Begin an AI-generated quest using words and actions.': '用对话和行动开启一段 AI 生成的冒险。',
    "Can't think of any ideas?": '没有灵感？',
    'Pick one of ours to get started.': '从我们准备的开局里挑一个吧。',
    "Use the browser below to select a scenario that tickles your fancy, you'll be able to view the contents before starting.":
      '在下面挑一个你感兴趣的开局，开始前可以先查看内容。',
    'Shuffle': '换一批',
    'View All Scenarios': '查看全部开局',
    'Click Here': '点击这里',
    'Before you begin, we recommend adding a genre and tags to your story. This will help the AI generate more appropriate content.':
      '开始之前，建议给故事加上类型和标签，这能帮助 AI 生成更合适的内容。',
    'A genre and a few tags can go a long way in improving the quality of your generations.':
      '一个类型加几个标签，就能明显提升生成质量。',

    // ---- 订阅 ----
    'You are subscribed to the Opus tier!': '你已订阅 Opus 档位！',
    'Unsubscribe': '取消订阅',
    'Update Payment Details': '更新付款信息',
    'Activate a Gift Key': '激活礼品码',

    // ---- 故事列表侧栏 ----
    'Your Stories': '你的故事',
    'Display': '显示',
    'Compact View': '紧凑视图',
    'Show On Top': '置顶显示',
    'Shelves': '书架',
    'Favorites': '收藏',
    'Local Stories': '本地故事',
    'Sort By': '排序方式',
    'Most Recent': '最近编辑',
    'Alphabetical': '按字母',
    'Creation Date': '创建时间',

    // ---- 编辑器 ----
    'Send': '发送',
    'Themes:': '主题：',
    'Customize how your NovelAI experience looks in the': '可以在这里自定义 NovelAI 的外观：',
    'Theme Settings': '主题设置',

    // ---- 右侧栏：Story ----
    'Story': '故事',
    'Advanced': '高级',
    'Story Mode': '故事模式',
    'AI Model': 'AI 模型',
    'Change Default': '修改默认',
    'Genre & Tags': '类型与标签',
    'Give the AI some direction with genres and tags.': '用类型和标签给 AI 指个方向。',
    'Genre': '类型',
    'Tags': '标签',
    'Config Preset': '配置预设',
    'Edit Preset': '编辑预设',
    'Changes the settings of the AI model.': '修改 AI 模型的生成设置。',
    'Editor Token Probabilities': '编辑器词元概率',
    'Selectable alternate tokens and probabilities will be shown in the editor.': '编辑器中会显示可选的备选词元及其概率。',
    'Enable to show selectable alternate tokens and probabilities in the editor.': '开启后，编辑器中会显示可选的备选词元及其概率。',
    'Memory': '记忆',
    'The AI will better remember info placed here.': '放在这里的信息 AI 会记得更牢。',
    'tokens': '个词元',
    "Author's Note": '作者注释',
    'Info placed here will strongly influence AI output.': '放在这里的信息会强烈影响 AI 的输出。',
    'Lorebook': '设定集',
    'Lorebook Quick Access': '设定集快速访问',
    'Story Options': '故事选项',
    'View Story Stats': '查看故事统计',
    'Remote Storage': '云端存储',
    'Story is currently stored encrypted on the server.': '故事目前以加密形式存储在服务器上。',
    'Story is currently stored locally. Locally stored stories may be deleted by your browser after a period of non-use.':
      '故事目前存储在本地。本地故事长时间不用可能会被浏览器清除。',
    'Export Story': '导出故事',
    'To File': '导出为文件',
    'Delete Story': '删除故事',
    '(cannot be undone)': '（无法撤销）',

    // ---- 右侧栏：Advanced ----
    'Context': '上下文',
    "Get a full view of what's sent to the AI.": '查看发送给 AI 的完整内容。',
    'Last Context': '上次上下文',
    'Current Context': '当前上下文',
    'Edit System Prompt': '编辑系统提示词',
    'Extend NovelAI with custom scripts.': '用自定义脚本扩展 NovelAI。',
    'Edit User Scripts': '编辑用户脚本',
    'Logit Bias': '词元偏置',
    "Weigh the AI's chance of generating specific tokens.": '调整 AI 生成特定词元的概率。',
    'Type in the area below, then press enter to save.': '在下方输入，按回车保存。',
    'Bias:': '偏置：',
    'A bias of zero will have no effect.': '偏置为 0 时不起作用。',
    'LESS': '更少',
    'MORE': '更多',
    'Tokens': '词元',
    'Click a token to edit it.': '点击词元进行编辑。',
    'Stop Sequences': '停止序列',
    'Duplicate and Start as Scenario': '复制并作为开局启动',
    'Imports current story as a scenario with placeholders': '把当前故事导入为带占位符的开局',

    // ---- 右侧栏：Settings ----
    'Choose from a selection of generation settings.': '从一组生成设置中选择。',
    'Settings saved to story.': '设置已保存到故事。',
    'Save to new Preset?': '保存为新预设？',
    'Other Options': '其他选项',
    'Reset Changes': '重置修改',
    'Generation Options': '生成选项',
    'Advanced Options': '高级选项',
    'Randomness': '随机性',
    'The higher the value, the more random the output!': '数值越高，输出越随机！',
    'Output Length': '输出长度',
    'Increase the length of the generated responses': '增加每次生成的长度',
    'Characters': '字符',

    // ---- 生图页 ----
    'Anlas:': 'Anlas：',
    'Anlas': 'Anlas',
    'Model': '模型',
    'Mode': '模式',
    'Anime': '动漫',
    'Furry': '兽人',
    'Prompt': '提示词',
    'Transparent BG': '透明背景',
    'Undesired Content': '负面内容',
    'Character Prompts': '角色提示词',
    'Create a separate prompt for characters in your scene.': '为场景中的角色单独写提示词。',
    'Reference Images': '参考图',
    'Image2Image': '图生图',
    'Transform your image.': '改造你的图片。',
    'Precise Reference': '精确参考',
    'Add a reference image for a character or style.': '为角色或画风添加参考图。',
    'Image Settings': '图像设置',
    'Resolution': '分辨率',
    'Normal': '普通',
    'Large': '大',
    'Small': '小',
    'Wallpaper': '壁纸',
    'Custom': '自定义',
    'Number of Images': '图片数量',
    'Steps': '步数',
    'Guidance': '引导强度',
    'Seed': '种子',
    'Sampler': '采样器',
    'Get Started': '开始使用',
    'Get Inspiration from our quick start gallery!': '从快速开始画廊里找找灵感！',
    'Click an image to copy the prompt.': '点击图片即可复制提示词。',
    'Chunks': '片段',
    'Tap to add a prompt...': '点击添加提示词……',
    'Prompt Chunks': '提示词片段',
    'No custom prompt chunks yet. Click + to add one.': '还没有自定义提示词片段，点 + 添加一个。',

    // ---- 预设值 ----
    'Standard': '标准',
    'Light': '轻度',
    'Heavy': '重度',
    'Human Focus': '人物优先',
    'None': '无',

    // ---- 属性（placeholder / title / 提示） ----
    'Search your stories': '搜索你的故事',
    'Search for an entry': '搜索条目',
    'Enter the text you want to bias': '输入要调整偏置的文字',
    'Type here and hit enter to add a stop sequence': '在这里输入，按回车添加停止序列',
    'Swap width and height': '交换宽高',
    'Add Category': '添加分类',
    'Add Prompt Chunk': '添加提示词片段',
    'Randomize': '随机',
    'Cuts generation short upon reaching a specified string.': '生成到指定文字时立即停止。',
    'Set a bias on specific tokens to increase or decrease their chance of being generated. Surround with [square brackets] to input token ids (tokenizer specific). If a sequence of tokens is given, only the first will have the bias applied.':
      '给特定词元设置偏置，提高或降低它们被生成的概率。用 [方括号] 包住可以直接输入词元 ID（取决于分词器）。如果给的是一串词元，只有第一个会被应用偏置。',

    // ---- 用户设置弹窗：侧栏 ----
    'User Settings': '用户设置',
    'AI Settings': 'AI 设置',
    'Interface': '界面',
    'Theme': '主题',
    'Text To Speech': '文字转语音',
    'Defaults': '默认设置',
    'Hotkeys': '快捷键',
    'Support': '支持',
    'Change Log': '更新日志',
    'New!': '新！',

    // ---- 用户设置：AI Settings ----
    'AI Responses': 'AI 回复',
    'Stream AI Responses': '流式输出 AI 回复',
    'AI responses will be streamed, appearing token by token.': 'AI 回复会以流式输出，一个词元一个词元地出现。',
    'Text will appear all at once when generation has finished.': '生成完成后文字会一次性出现。',
    'Streamed Response Delay': '流式输出延迟',
    'Continue Response to End of Sentence': '把回复续写到句末',
    'Responses will attempt to continue until the end of a sentence is found.': '回复会尽量继续，直到遇到句子结尾。',
    'Responses will end normally.': '回复正常结束。',
    'Hypebot': 'Hypebot 评论机器人',
    'Comment Output': '评论输出',
    'Off': '关闭',
    'Automatic': '自动',
    'Permanent': '常驻',
    'Set comment generation off': '关闭评论生成',
    'Set comment generation on': '开启评论生成',
    'Set comment generation on and always show dialog': '开启评论生成并始终显示对话框',
    'Comment Chance': '评论概率',
    'Comment Avatar': '评论头像',
    'Auto-Select': '自动选择',
    'Select a comment avatar': '选择评论头像',
    'Comment Streamed Response Delay': '评论流式输出延迟',
    'Experimental': '实验性功能',
    'Preamble': '前导文本',
    'The context will have a small preamble prepended to improve generations on low context. The exact behaviour varies per model.':
      '会在上下文前加一小段前导文本，用来改善上下文较少时的生成效果。具体表现因模型而异。',
    'The context will not have a preamble prepended.': '不在上下文前添加前导文本。',
    'Default Bias': '默认偏置',
    'A default bias will be applied, reducing the likelyhood of dinkus (***) and asterism (⁂) to be generated.':
      '会应用默认偏置，降低生成分隔符（***）和三星号（⁂）的概率。',
    'No default bias will be applied.': '不应用默认偏置。',
    'Enable Token Probabilities': '启用词元概率',
    'Generation requests will return token probabilities for the response which can be examined by clicking the':
      '生成请求会返回回复的词元概率，可以点击',
    'button next to Retry.': '按钮查看（在“重试”旁边）。',
    'Token probabilities will not be returned with generation requests.': '生成请求不会返回词元概率。',

    // ---- 首页（未登录落地页） ----
    'Sharper details, more characters, full comic pages — all in one model.': '细节更清晰，角色更多，整页漫画，一个模型全搞定。',
    'Learn More': '了解更多',
    'Pricing': '价格',
    'Blog': '博客',
    'Community': '社区',
    'Login': '登录',
    'Homepage': '首页',
    'Images': '图像',
    'Stories': '故事',
    'Story Generation': '故事生成',
    'POWERED BY GLM 4.6': '由 GLM 4.6 驱动',
    'Create stunning': '用 AI 创作',
    'Anime Art with AI': '惊艳的动漫插画',
    'Generate original characters, scenes, and artwork in seconds. No restrictions. No compromises.':
      '几秒钟生成原创角色、场景和作品。没有限制，绝不妥协。',
    'Start Generating for Free': '免费开始生成',
    'Write worlds': '写下一个个世界',
    'that remember everything': '而且它什么都记得',
    'Build stories, worlds, and characters with an AI that writes with you — not for you.':
      '和 AI 一起构建故事、世界和角色——它陪你写，而不是替你写。',
    'Start Writing for Free': '免费开始写作',
    'Create High Quality': '创作高质量的',
    'AI Anime Art & Stories': 'AI 动漫插画与故事',
    'Unleash the power of NovelAI with a suite of tools to easily bring your imagination to life without limits.':
      '用 NovelAI 的整套工具，轻松把你的想象变成现实，不设上限。',
    'Start For': '现在就',
    'Free': '免费',
    'Now.': '开始。',
    'Generate Images': '生成图像',
    'Write Stories': '写故事',
    "Anything you've ever imagined,": '你想象过的一切，',
    'brought to life in seconds.': '几秒钟就能成真。',
    'Every character, every scene — created by you with a single prompt.': '每个角色、每个场景，一句提示词就能由你亲手创造。',
    'Generate Images Now': '立即生成图像',
    'A writing space built around the way you create, not the other way around.': '一个围绕你的创作方式打造的写作空间，用不着你去迁就它。',
    'Start Writing Now': '立即开始写作',
    'Bring your imagination to life': '让你的想象成真',
    'without limits': '不设上限',
    'Whether you are painting worlds or writing them — NovelAI gives you the tools to create without compromise.':
      '无论你是画出世界还是写出世界，NovelAI 都给你毫无妥协的创作工具。',
    'Our Latest Blog Posts': '最新博客文章',

    // ---- 常见问题 FAQ ----
    'Frequently Asked Questions': '常见问题',
    'What is NovelAI?': 'NovelAI 是什么？',
    "NovelAI is the #1 AI image generator tool for generating AI anime art or crafting epic stories. NovelAI is your personal creative space for generating anime-style art through AI. Our AI art generator maintains professional quality and consistency whether you're creating character illustrations, scenic backgrounds, or action scenes. From soft, gentle styles to dynamic compositions, you can create any AI anime art you envision. Unleash your creativity and generate anime images and stories without limits!":
      'NovelAI 是排名第一的 AI 图像生成工具，可以生成 AI 动漫插画，也能创作史诗故事。它是你用 AI 创作动漫风格作品的个人创作空间。无论是角色立绘、场景背景还是动作场面，我们的 AI 绘图都能保持专业的质量和一致性。从柔和温婉的画风到充满张力的构图，你想到的 AI 动漫作品都能做出来。尽情发挥创意，无限生成动漫图像和故事吧！',
    'What makes NovelAI different from other AI art generators?': 'NovelAI 和其他 AI 绘图工具有什么不同？',
    'NovelAI specializes in making AI anime art creation easy with natural language prompting and tagging, offering easy character consistency and precise control. You can easily manipulate prompts, adjust character positioning, use action tags, and define characters separately to maintain consistency across scenes. You have the ability to define exactly what they are supposed to be doing, separately. NovelAI removes hardware barriers—accessible from your mobile device with fast generation speeds and no installation required.':
      'NovelAI 专注于让 AI 动漫创作变简单：支持自然语言提示词和标签，角色一致性好做，控制也精准。你可以轻松调整提示词、角色位置，使用动作标签，还能给角色单独设定，让多个场景保持一致，每个角色在做什么都能分开精确定义。NovelAI 也去掉了硬件门槛：手机就能用，生成速度快，不用安装任何东西。',
    'Is my privacy really protected when using NovelAI?': '用 NovelAI 时我的隐私真的有保障吗？',
    "Yes, privacy is fundamental to NovelAI. We offer complete anonymity - you can generate images using AI without linking any personal information. Your prompts are encrypted and all generated images are never stored on our servers (they only exist during your session unless you choose to save them), and we don't track or monitor your creative process. You have full control over your work and privacy.":
      '是的，隐私是 NovelAI 的根本。我们提供完全匿名：生成图像不需要关联任何个人信息。你的提示词会被加密，生成的图片也从不存储在我们的服务器上（除非你自己保存，否则只在当前会话中存在），我们也不会追踪或监控你的创作过程。你的作品和隐私完全由你掌控。',
    "Can I use NovelAI's generated images however I want?": 'NovelAI 生成的图片我可以随便用吗？',
    "Yes, you have complete freedom to use your AI anime art as you wish. Unlike other services, there are no limitations on commercial use. You do not need to purchase any additional subscription tiers either. Whether it's for personal projects, commercial work, or any other purpose, NovelAI is ideal for artists, content creators, and storytellers looking to bring their ideas to life.":
      '可以，你的 AI 动漫作品想怎么用都行。和其他服务不同，这里没有商用限制，也不需要额外购买更高的订阅档位。无论是个人项目、商业作品还是其他用途，NovelAI 都很适合想把点子变成现实的画师、内容创作者和写故事的人。',
    'How much does NovelAI cost, and what do I get?': 'NovelAI 多少钱？能得到什么？',
    "Our subscriptions start at $10/month, perfect for casual creators with access to both our AI anime image generator and text generator. While we're not a free AI image generator, our subscription model ensures we can provide high-quality service without compromising on features. New users can try our platform through our trial period to experience the full capabilities or if you don't want to worry about a monthly subscription, you can use the on-demand Anlas purchasing option to fuel your image generation capabilities!":
      '订阅每月 10 美元起，很适合轻度创作者，可以同时使用 AI 动漫图像生成和文本生成。我们不是免费的 AI 绘图工具，但订阅制能保证我们在不缩水功能的前提下提供高质量服务。新用户可以通过试用期体验全部功能；不想按月订阅的话，也可以按需购买 Anlas 来生图！',
    'How can I edit and refine my generated images?': '怎么编辑和细化生成的图片？',
    'NovelAI offers powerful editing tools to perfect your AI anime art. Our inpainting feature lets you selectively modify specific areas - from adjusting facial features to completely changing backgrounds. With Director Tools you can enhance details, modify clothing, adjust lighting, or even change character poses while maintaining the overall style and quality. We also offer a built-in canvas for quick on-the-spot edits to guide the AI along to paint your art, just how you envision it!':
      'NovelAI 提供强大的编辑工具来打磨你的作品。局部重绘可以只改指定区域，小到调整五官，大到整个换背景。用导演工具可以增强细节、换衣服、调光线，甚至改角色姿势，同时保持整体画风和质量。还有内置画布，能随手改几笔，引导 AI 按你想的样子画出来！',
    'How can I get started with NovelAI?': '怎么开始使用 NovelAI？',
    "Getting started is easy. Simply register with your email address and you will be able to sign in and try our generator. Our interface is designed to be intuitive while giving you full creative control. You'll have immediate access to our features from the moment you begin.":
      '上手很简单，用邮箱注册后就能登录试用生成器。界面设计得很直观，同时给你完整的创作控制权，从一开始就能直接用上所有功能。',

    // ---- 页脚 ----
    'Manage Cookie Preferences': '管理 Cookie 偏好',
    'Terms of Service': '服务条款',
    'Privacy Policy': '隐私政策',
    'Contact Us': '联系我们',
    'Press Kit': '媒体资料',
    'Updates': '更新',
    'Status': '服务状态',

    // ---- 定价页 ----
    'Simple, transparent pricing.': '简单透明的价格。',
    'All paid plans include both Image Generation and Text Generation.': '所有付费方案都同时包含图像生成和文本生成。',
    'Start with a free trial.': '从免费试用开始。',
    '30 Free Image Generations': '30 次免费生图',
    '50 Free Text Generations': '50 次免费文本生成',
    'Start for Free': '免费开始',
    'Explore Our Plans': '查看订阅方案',
    'For the Enthusiast': '发烧友之选',
    'Image Gen Access': '图像生成权限',
    'Access to our image generation features.': '可以使用图像生成功能。',
    'Pay As You Go': '按量付费',
    'Unlimited*': '无限*',
    'Purchase Discount': '购买折扣',
    'The amount taken off our on-demand Anlas pricing.': '按需购买 Anlas 时享受的折扣。',
    'Bonus': '赠送',
    'Free extra monthly currency for use in generating images on NovelAI.**': '每月额外赠送的生图货币。**',
    'Unlimited Text Generations': '无限文本生成',
    'Generate as many stories as you want without usage caps.': '想写多少故事就写多少，没有用量上限。',
    'Memory Size': '记忆容量',
    '(Characters)': '（字符）',
    'The number of characters the AI can remember. (1 Token = ~4 Characters)': 'AI 能记住的字符数。（1 个词元 ≈ 4 个字符）',
    'TTS': '语音朗读',
    'Advanced and fast AI TTS built to read your written stories out aloud.': '先进又快速的 AI 语音，把你写的故事朗读出来。',
    'Storytelling with long context and multi-language support.': '长上下文、支持多语言的故事模型。',
    'Highly capable cowriting model.': '能力很强的协作写作模型。',
    'Our latest, largest and most formidable Text Generation model.': '我们最新、最大、最强的文本生成模型。',
    '* For images of up to 1024x1024 pixels and up to 28 steps when generating a single image. Additional usage limits apply to NovelAI Diffusion V5':
      '* 仅限单张生成、不超过 1024x1024 像素且不超过 28 步的图片。NovelAI Diffusion V5 另有额外用量限制',
    '** A pool of Anlas that refills each month to the amount for your subscription tier. It will only refill if you have less than the amount for your subscription tier.':
      '** 一个每月补满到你订阅档位额度的 Anlas 池。只有余额低于档位额度时才会补充。',
    'Not interested in a monthly subscription? Check out our pay-as-you go options instead.': '不想按月订阅？可以看看按量付费方案。',
    'What are Anlas?': 'Anlas 是什么？',
    'Anlas = image generation credits': 'Anlas = 生图点数',
    'Anlas are the currency used to generate images on NovelAI. Each image costs a small number depending on resolution and settings.':
      'Anlas 是 NovelAI 上用来生图的货币。每张图消耗少量 Anlas，具体取决于分辨率和设置。',
    'Text generation does not use Anlas': '文本生成不消耗 Anlas',
    '— it is included with any subscription.': '——任何订阅都已包含。',
    'Subscribe vs Buy Credits': '订阅还是买点数',
    'Which is right for you?': '哪种适合你？',
    'Subscribe if...': '适合订阅，如果你……',
    'You generate regularly and want the best value per image plus full text tool access.': '经常生图，想要最划算的单张成本，还想用全部文本工具。',
    'Buy Anlas if...': '适合买 Anlas，如果你……',
    'You need a top-up mid-month, or generate images occasionally without a recurring commitment.': '月中需要补充额度，或者只是偶尔生图、不想长期订阅。',

    // ---- 登录后主页（Dashboard） ----
    'Version': '版本',
    'Settings': '设置',
    'News': '新闻',
    'Visualize your favorite characters.': '把你喜欢的角色画出来。',
    'Image Generator': '图像生成器',
    'Generate Anime and Furry imagery with our SOTA image gen model!': '用我们顶尖的图像生成模型，生成动漫和兽人风格的图像！',
    'Use a variety of AI tools to edit your images.': '用各种 AI 工具编辑你的图片。',
    'See what the Community is dreaming up.': '看看社区正在创作什么。',
    'Image Gallery': '图库',
    'Browse and share Image Generations from the NovelAI community.': '浏览并分享 NovelAI 社区的图像作品。',
  };

  // ========== 规则：带变量的文字 ==========
  const t = (s) => DICT[norm(s)] || s;
  const PATTERNS = [
    [/^Generate (\d+) Images?$/, (m) => `生成 ${m[1]} 张图片`],
    [/^Quality Tags: (.+)$/, (m) => `质量标签：${t(m[1])}`],
    [/^UC Preset: (.+)$/, (m) => `负面预设：${t(m[1])}`],
    [/^Default: (.+)$/, (m) => `默认：${m[1]}`],
    [/^Version (.+)$/, (m) => `版本 ${m[1]}`],
    [/^Last Edited: (.+)$/, (m) => `上次编辑：${timeAgo(m[1])}`],
    [/^Bias (\S+) \|$/, (m) => `偏置 ${m[1]} |`],
    [/^You are currently using (\w+) mode\./, (m) => `当前使用${t(m[1])}模式。切换模式会改变标签提示，并在提示词中加入数据集标签。点击图标可以切换。`],
    [/^Your subscription renews around (.+)\.$/, (m) => `订阅将在 ${m[1]} 左右自动续费。`],
    [/^Your subscription ends on (.+) and does not renew\.$/, (m) => `订阅将于 ${m[1]} 结束，不再续费。`],
    [/^([\d,]+) tokens$/, (m) => `${m[1]} 个词元`],
    [/^(\d+)% Discount$/, (m) => `${m[1]}% 折扣`],
    [/^(\d+) Stor(?:y|ies)$/, (m) => `${m[1]} 个故事`],
  ];

  function timeAgo(s) {
    const map = {
      'a few seconds ago': '几秒前',
      'a minute ago': '1 分钟前',
      'an hour ago': '1 小时前',
      'a day ago': '1 天前',
      'a month ago': '1 个月前',
      'a year ago': '1 年前',
    };
    if (map[s]) return map[s];
    const m = s.match(/^(\d+) (second|minute|hour|day|month|year)s? ago$/);
    if (!m) return s;
    const unit = { second: '秒', minute: '分钟', hour: '小时', day: '天', month: '个月', year: '年' }[m[2]];
    return `${m[1]} ${unit}前`;
  }

  function norm(s) {
    return s.replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();
  }

  function translate(raw) {
    const s = norm(raw);
    if (!s) return null;
    if (DICT[s] !== undefined) return DICT[s];
    const ago = timeAgo(s);
    if (ago !== s) return ago;
    for (const [re, fn] of PATTERNS) {
      const m = s.match(re);
      if (m) return fn(m);
    }
    return null;
  }

  // ========== 不碰的区域：正文、输入框、用户自己的故事标题 ==========
  const SKIP = [
    '.ProseMirror', '[contenteditable="true"]', 'textarea', 'input',
    '.sidebar-story-card', '.monaco-editor', 'script', 'style',
    'code', 'pre', '.osano-cm-window',
  ].join(',');

  function skipped(el) {
    return !el || el.closest(SKIP);
  }

  function doText(node) {
    if (skipped(node.parentElement)) return;
    const raw = node.nodeValue;
    const out = translate(raw);
    if (out === null || out === norm(raw)) return;
    const lead = raw.match(/^\s*/)[0];
    const tail = raw.match(/\s*$/)[0];
    node.nodeValue = lead + out + tail;
  }

  const ATTRS = ['placeholder', 'title', 'data-tip', 'aria-label'];
  function doAttrs(el) {
    if (el.matches && el.closest('.ProseMirror, .monaco-editor')) return;
    for (const a of ATTRS) {
      const v = el.getAttribute && el.getAttribute(a);
      if (!v) continue;
      const out = translate(v);
      if (out !== null && out !== v) el.setAttribute(a, out);
    }
  }

  function walk(root) {
    if (root.nodeType === Node.TEXT_NODE) return doText(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (skipped(root)) return;
    doAttrs(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === Node.TEXT_NODE) doText(n);
      else doAttrs(n);
    }
  }

  // ========== 监听动态变化，攒一帧再处理 ==========
  const pending = new Set();
  let scheduled = false;
  function flush() {
    scheduled = false;
    for (const n of pending) walk(n);
    pending.clear();
  }
  function queue(n) {
    pending.add(n);
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(flush);
    }
  }

  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'childList') m.addedNodes.forEach(queue);
      else if (m.type === 'characterData') queue(m.target);
      else if (m.type === 'attributes') queue(m.target);
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });

  walk(document.body);
})();
