// 游戏开发与游戏设计名言集（中文翻译版）
// 每条包含：quote（名言）、author（作者）、source（来源/作品，可选）

export interface Quote {
	quote: string;
	author: string;
	source?: string;
}

export const quotes: Quote[] = [
	{
		quote: "游戏设计就是创造有趣决策的艺术。",
		author: "席德·梅尔（Sid Meier）",
		source: "《文明》之父",
	},
	{
		quote: "游戏就是一系列有趣的选择。",
		author: "席德·梅尔（Sid Meier）",
		source: "《文明》",
	},
	{
		quote: "应该让玩家觉得自己聪明，而不是让设计师显得聪明。",
		author: "乔纳森·布洛（Jonathan Blow）",
		source: "《见证者》《时空幻境》",
	},
	{
		quote: "游戏不需要\u201C好玩\u201D才算好，它只需要让人沉浸其中。",
		author: "拉夫·科斯特（Raph Koster）",
		source: "《游戏设计的乐趣理论》",
	},
	{
		quote: "乐趣不过是学习的另一种说法。",
		author: "拉夫·科斯特（Raph Koster）",
		source: "《游戏设计的乐趣理论》",
	},
	{
		quote: "最好的游戏是那些无需言语就能讲述故事的作品。",
		author: "陈星汉（Jenova Chen）",
		source: "《风之旅人》《光·遇》",
	},
	{
		quote: "约束激发创造力。限制是发明之母。",
		author: "马库斯·佩尔松（Notch）",
		source: "《我的世界》",
	},
	{
		quote: "迭代是游戏开发中最重要的事：做出来，测试，修改，重复。",
		author: "汤米·雷芬斯（Tommy Refenes）",
		source: "《超级肉肉哥》",
	},
	{
		quote: "跳票的游戏最终会变好，但糟糕的游戏永远糟糕。",
		author: "宫本茂（Shigeru Miyamoto）",
		source: "任天堂",
	},
	{
		quote: "游戏的本质是玩家必须克服的一套规则。",
		author: "杰西·谢尔（Jesse Schell）",
		source: "《游戏设计艺术》",
	},
	{
		quote: "好的游戏设计是让玩家做出的每个选择都有意义、有后果。",
		author: "沃伦·斯佩克特（Warren Spector）",
		source: "《杀出重围》",
	},
	{
		quote: "你的头一万个游戏是最难的，之后就会容易一些。",
		author: "改编自 井山裕太",
		source: "围棋 / 游戏设计通用",
	},
	{
		quote: "关卡设计是在玩家不知不觉中引导他们的艺术。",
		author: "佚名关卡设计师",
		source: "关卡设计箴言",
	},
	{
		quote: "尽早原型化，频繁原型化。一个糟糕的原型和好的原型一样能告诉你很多。",
		author: "布伦达·罗梅罗（Brenda Romero）",
		source: "游戏设计师 / 教授",
	},
	{
		quote: "游戏设计师的工作是创造能产生有趣涌现行为的系统。",
		author: "威尔·莱特（Will Wright）",
		source: "《模拟城市》《模拟人生》",
	},
	{
		quote: "完美不是无可增添，而是无可删减。",
		author: "安托万·德·圣-埃克苏佩里",
		source: "游戏设计通用原则",
	},
	{
		quote: "游戏开发是 90% 的调试加上 10% 的假装自己知道在做什么。",
		author: "匿名",
		source: "游戏开发者社区",
	},
	{
		quote: "预测未来的最好方式就是亲手实现它。",
		author: "改编自 艾伦·凯（Alan Kay）",
		source: "游戏开发实践",
	},
	{
		quote: "不要为自己设计。为那些从未玩过你游戏的人设计。",
		author: "埃德蒙·麦克米伦（Edmund McMillen）",
		source: "《以撒的结合》",
	},
	{
		quote: "优雅的游戏里，每个系统都在支撑其他所有系统。",
		author: "泰南·西尔维斯特（Tynan Sylvester）",
		source: "《环世界》/《游戏设计实战》",
	},
	{
		quote: "叙事设计不是写一个故事，而是设计让故事得以涌现的条件。",
		author: "皮特罗·波尔西内利（Pietro Polsinelli）",
		source: "《叙事设计漫谈》",
	},
	{
		quote: "游戏设计师工具箱里最强大的工具，是用别人的眼睛来看你的游戏。",
		author: "杰西·谢尔（Jesse Schell）",
		source: "《游戏设计艺术》",
	},
	{
		quote: "好的关卡设计不用教程来教。环境本身会告诉玩家该做什么。",
		author: "佚名",
		source: "关卡设计通用",
	},
	{
		quote: "简洁是游戏机制的终极优雅。一个按钮如果按对了地方，就足够了。",
		author: "扎克·盖奇（Zach Gage）",
		source: "《SpellTower》《Typeshift》",
	},
	{
		quote: "世界观设计不是创造一张地图，而是为可信的因果逻辑搭建框架。",
		author: "肯·罗尔斯顿（Ken Rolston）",
		source: "《上古卷轴III：晨风》",
	},
	{
		quote: "游戏开发者最重要的技能不是编程也不是美术——而是对玩家的同理心。",
		author: "兰迪·史密斯（Randy Smith）",
		source: "《耻辱》《神偷》",
	},
	{
		quote: "数据驱动设计：让数字告诉你什么在奏效，而不是让自负说了算。",
		author: "阿基·耶尔维宁（Aki Järvinen）",
		source: "游戏数据分析",
	},
	{
		quote:
			"伟大的游戏让玩家觉得自己是个天才——只因为发现了你一直想让他们做的事。",
		author: "佚名",
		source: "游戏设计通用",
	},
	{
		quote: "打磨不是一个阶段，而是从第一天就开始的心态。",
		author: "凯尔·加布勒（Kyle Gabler）",
		source: "《粘粘世界》",
	},
	{
		quote: "游戏开发中最危险的四个字是\u201C以后再说\u201D。",
		author: "改编自 德怀特·艾森豪威尔",
		source: "游戏项目管理",
	},
	{
		quote: "每个游戏机制都应为核心体验服务。如果不服务，就砍掉它。",
		author: "罗宾·亨尼克（Robin Hunicke）",
		source: "《风之旅人》/ MDA 框架",
	},
	{
		quote: "MDA 框架告诉我们：机制创造动态，动态创造美学体验。",
		author: "亨尼克、勒布朗、祖贝克",
		source: "MDA: A Formal Approach to Game Design",
	},
	{
		quote: "失败不是乐趣的反面。它是乐趣不可或缺的原料。",
		author: "杰斯珀·尤尔（Jesper Juul）",
		source: "《失败的艺术》",
	},
	{
		quote: "如果你想做出一款好游戏，先玩好游戏。然后问自己它们为什么好。",
		author: "小岛秀夫（Hideo Kojima）",
		source: "小岛秀夫",
	},
	{
		quote: "游戏写作不同于任何其他媒介——因为玩家就是主角。",
		author: "肯·莱文（Ken Levine）",
		source: "《生化奇兵》",
	},
	{
		quote: "核心循环是你游戏的心跳。其他一切都是装饰。",
		author: "佚名",
		source: "游戏设计通用",
	},
	{
		quote: "平衡不是让一切平等，而是让每个选择在某种情境下都成立。",
		author: "索伦·约翰逊（Soren Johnson）",
		source: "《文明IV》《Offworld Trading Company》",
	},
	{
		quote: "一个原型抵得上一千份设计文档。",
		author: "佚名",
		source: "游戏开发实践",
	},
	{
		quote: "最好的界面就是没有界面。最好的教程就是没有教程。",
		author: "佚名",
		source: "交互设计原则",
	},
	{
		quote: "游戏是唯一一种让观众参与创造体验的艺术形式。",
		author: "克里斯·克劳福德（Chris Crawford）",
		source: "《计算机游戏设计的艺术》",
	},
	{
		quote: "《矮人要塞》证明了深度永远胜过画面——只要你有一双能看见它的眼睛。",
		author: "塔恩·亚当斯（Tarn Adams）",
		source: "《矮人要塞》",
	},
	{
		quote: "程序化生成不是捷径，而是一种需要独特工艺的设计方式。",
		author: "汤姆·贝茨（Tom Betts）",
		source: "程序化生成设计",
	},
	{
		quote: "设计文档不是为了记录你要建什么，而是为了发现你应该建什么。",
		author: "斯通·利布兰德（Stone Librande）",
		source: "《模拟城市》/ 一页设计文档法",
	},
	{
		quote: "一页设计迫使你分轻重缓急。如果一页都写不下，一个游戏也装不下。",
		author: "斯通·利布兰德（Stone Librande）",
		source: "一页设计文档法",
	},
	{
		quote:
			"好游戏和伟大游戏的差距，往往只是把最后 5% 的打磨用在最关键的 5% 上。",
		author: "佚名",
		source: "游戏开发通用",
	},
	{
		quote: "范围是独立游戏的无声杀手。从小做起，做完再做大。",
		author: "德里克·余（Derek Yu）",
		source: "《洞穴探险》",
	},
	{
		quote: "在程序化生成中，设计师从建筑师变成了园丁。",
		author: "凯特·康普顿（Kate Compton）",
		source: "程序化生成 / PCG 研究",
	},
	{
		quote: "玩家能感觉到开发者对游戏有没有热情，他们像狗闻骨头一样闻得出来。",
		author: "斯科特·罗杰斯（Scott Rogers）",
		source: "《Swatch! Level Up!》",
	},
	{
		quote: "你的头十款游戏会做得很烂，所以快点把它们做出来。",
		author: "杰西·谢尔（Jesse Schell）",
		source: "《游戏设计艺术》",
	},
	{
		quote: "痛苦会过去，但你的作品永远留存。",
		author: "约翰·卡马克（John Carmack）",
		source: "id Software 联合创始人",
	},
	{
		quote: "故事就像游戏的骨架，但它们不一定是游戏本身。游戏是关于做出选择的。",
		author: "沃伦·斯佩克特（Warren Spector）",
		source: "《杀出重围》",
	},
	{
		quote: "在故事中我们只能想象，在游戏中我们可以体验。这是交互性的核心力量。",
		author: "埃尔亚达·莫斯（Elad Mordechai）/ 游戏编剧",
		source: "叙事设计",
	},
	{
		quote:
			"关卡设计的本质是创造有意义的空间。每个转角、每堵墙都应该能传递信息。",
		author: "克里斯蒂安·沃克（Christian Walker）",
		source: "关卡设计通用",
	},
	{
		quote: "游戏这个词意味着竞争性，意味着你可以赢也可以输。",
		author: "横井军平（Gunpei Yokoi）",
		source: "任天堂 / Game Boy 之父",
	},
	{
		quote: "侧向思考——枯萎技术的水平思考。",
		author: "横井军平（Gunpei Yokoi）",
		source: "任天堂 设计哲学",
	},
	{
		quote: "游戏设计师是让玩家快乐的人。",
		author: "上田文人（Fumito Ueda）",
		source: "《旺达与巨像》《ICO》",
	},
	{
		quote: "我想创造没人见过的东西。不管做什么类型，我都想做独一无二的东西。",
		author: "上田文人（Fumito Ueda）",
		source: "《旺达与巨像》",
	},
	{
		quote: "游戏需要简单才能触及非玩家群体。我自己也不喜欢太复杂的游戏。",
		author: "上田文人（Fumito Ueda）",
		source: "《ICO》设计理念",
	},
	{
		quote: "惊险和愉悦都不应该在游戏中占主导，好的游戏需要两者之间的平衡。",
		author: "福光光司（Fukio Mitsuji）",
		source: "《泡泡龙》",
	},
	{
		quote: "只有游戏会回击玩家时，玩家才有动力继续。",
		author: "福光光司（Fukio Mitsuji）",
		source: "街机游戏设计",
	},
	{
		quote:
			"要想做出好游戏，你得有分析性的头脑，还要有从无到有创造新想法的想象力。",
		author: "福光光司（Fukio Mitsuji）",
		source: "给游戏设计师的建议",
	},
	{
		quote:
			"每一个游戏都承诺了玩家与敌人之间的某种冲突，但如果敌人无视玩家'不跟他玩'呢？玩家肯定会因为无聊而离开。",
		author: "福光光司（Fukio Mitsuji）",
		source: "《Bubble Bobble》设计",
	},
	{
		quote: "从菜鸟到专业游戏程序员没有捷径。至少需要2-3年，通常需要5-10年。",
		author: "安迪·加文（Andy Gavin）",
		source: "Naughty Dog / 《古惑狼》",
	},
	{
		quote: "每一堆箱子、每一组敌人都被精心放置，为的是构建游戏节奏的脉搏。",
		author: "安迪·加文（Andy Gavin）",
		source: "《古惑狼》关卡设计",
	},
	{
		quote:
			"游戏的叙事不需要像电影那样层层揭开真相。游戏的魅力在于你'去做'，而不是'去看'。",
		author: "上田文人（Fumito Ueda）",
		source: "《ICO》《旺达与巨像》",
	},
	{
		quote: "原型化、原型化、再原型化。不要在花里胡哨的设计文档上浪费时间。",
		author: "肯·王（Ken Wong）",
		source: "《纪念碑谷》",
	},
	{
		quote: "失败是设计过程中必不可少的一部分。每次失败都在教你什么东西不该做。",
		author: "彼得·莫利纽克斯（Peter Molyneux）",
		source: "《黑与白》《神鬼寓言》",
	},
	{
		quote: "如果你想让游戏看起来容易，你自己得先做得很辛苦。",
		author: "宫本茂（Shigeru Miyamoto）",
		source: "任天堂",
	},
	{
		quote: "一个好游戏应该是容易上手难以精通的。",
		author: "宫本茂（Shigeru Miyamoto）",
		source: "任天堂 设计原则",
	},
	{
		quote: "我不做游戏给玩家，我做游戏给人们。",
		author: "宫本茂（Shigeru Miyamoto）",
		source: "任天堂",
	},
	{
		quote: "故事不是游戏的本质。玩家在游戏中做的事才是。",
		author: "小岛秀夫（Hideo Kojima）",
		source: "《潜龙谍影》系列",
	},
	{
		quote:
			"交互性是游戏独有的语言。其他媒介能展示勇气，但只有游戏能让玩家成为勇敢的人。",
		author: "大卫·贾菲（David Jaffe）",
		source: "《战神》",
	},
	{
		quote: "一个关卡应该像一本好书一样有开头、中间和结尾。",
		author: "理查德·巴特利特（Richard Bartle）",
		source: "MUD / 玩家类型理论",
	},
	{
		quote:
			"程序设计之于游戏开发，就像语法之于写作。没有它你什么都做不了，但光有它也写不出杰作。",
		author: "约翰·卡马克（John Carmack）",
		source: "id Software",
	},
	{
		quote: "在任天堂，我们不是在制造游戏，我们是在制造玩具。玩具的本质是好玩。",
		author: "宫本茂（Shigeru Miyamoto）",
		source: "任天堂",
	},
	{
		quote: "AI 不是用来替代游戏设计师的，而是用来放大设计师的创造力的。",
		author: "朱利安·图维尔（Julian Togelius）",
		source: "AI 游戏设计研究",
	},
	{
		quote: "玩家的时间是最宝贵的资源。你的游戏不配浪费它。",
		author: "拉夫·科斯特（Raph Koster）",
		source: "《游戏设计的乐趣理论》",
	},
	{
		quote: "最好的游戏教你如何玩，而不让你意识到你在学习。",
		author: "席德·梅尔（Sid Meier）",
		source: "《文明》系列",
	},
	{
		quote: "在游戏中，规则就是一切。改变规则，你就改变了游戏本身。",
		author: "伯尼·德科文（Bernie DeKoven）",
		source: "《The Well-Played Game》",
	},
	{
		quote: "好的游戏写作不是写漂亮的句子，而是设计玩家能发现的情境。",
		author: "苏珊·奥康纳（Susan O'Connor）",
		source: "游戏叙事设计 / 《神秘海域》",
	},
	{
		quote: "关卡是无声的故事讲述者。好的关卡通过空间和光线来说话。",
		author: "史蒂夫·盖诺（Steve Gaynor）",
		source: "《Gone Home》关卡设计",
	},
	{
		quote: "游戏机制是动词，叙事是名词。动词让名词变得重要。",
		author: "塔尔·桑格（Tadhg Kelly）",
		source: "游戏设计理论",
	},
	{
		quote:
			"当你把有趣的选择放在玩家面前，你就不需要强制他们'做正确的事'。正确的选择自然会吸引人。",
		author: "丹·费尔德（Dan Felder）",
		source: "游戏设计博客",
	},
	{
		quote: "你不必制作所有人都喜欢的游戏。你只需要制作一些人非常热爱的游戏。",
		author: "富兰克·拉兹（Frank Lantz）",
		source: "NYU 游戏中心教授",
	},
	{
		quote: "游戏设计最难的技能不是加法而是减法——知道该去掉什么。",
		author: "布伦达·罗梅罗（Brenda Romero）",
		source: "游戏设计师 / 教授",
	},
	{
		quote: "真正的开放世界不是地图大，而是玩家解决问题的方式多。",
		author: "肯·莱文（Ken Levine）",
		source: "《生化奇兵》",
	},
	{
		quote:
			"像素级的打磨，比听起来重要得多。玩家可能说不清哪里不对，但他们能感觉到。",
		author: "埃德蒙·麦克米伦（Edmund McMillen）",
		source: "《以撒的结合》《超级肉肉哥》",
	},
	{
		quote: "最好的游戏测试玩家能找出你觉得没人会在意的问题。多留意他们。",
		author: "迈克·安布勒（Mike Ambinder）",
		source: "Valve 游戏测试 / 心理学",
	},
	{
		quote: "在游戏的尽头，玩家不会记得你写的故事——他们会记得他们自己的故事。",
		author: "克林特·霍金（Clint Hocking）",
		source: "《孤岛惊魂2》创意总监",
	},
	{
		quote: "好游戏的秘密不是没有Bug，而是玩家在Bug出现时也不在乎。",
		author: "汤姆·霍尔（Tom Hall）",
		source: "《Commander Keen》共同创作者",
	},
	{
		quote: "设计文档不是蓝图，而是交谈的起点。",
		author: "斯通·利布兰德（Stone Librande）",
		source: "《暗黑破坏神3》/ 一页设计文档法",
	},
	{
		quote: "关卡设计的第一步不是打开编辑器，而是画草图。",
		author: "约翰·罗梅罗（John Romero）",
		source: "《DOOM》关卡设计",
	},
	{
		quote: "当玩家说'这个游戏太简单了'，通常不是因为难度低，而是因为选择太少。",
		author: "索伦·约翰逊（Soren Johnson）",
		source: "《文明IV》主设计师",
	},
	{
		quote:
			"世界观和故事给玩家一个'为什么'。没有这个'为什么'，再好的机制也会让人觉得空洞。",
		author: "帕特里斯·德西莱（Patrice Désilets）",
		source: "《刺客信条》创意总监",
	},
	{
		quote: "开放世界的真正挑战不是内容量，而是密度——每个角落都得有故事可讲。",
		author: "托德·霍华德（Todd Howard）",
		source: "Bethesda Game Studios",
	},
	{
		quote:
			"最好的叙事设计是你甚至没注意到它在发生。故事和玩法融为一体，不分彼此。",
		author: "詹姆斯·沃格特（James Vogt）",
		source: "游戏叙事设计",
	},
	{
		quote: "一个被完全理解的游戏是很快就会被放弃的游戏。神秘感也是一种驱动力。",
		author: "拉夫·科斯特（Raph Koster）",
		source: "《游戏设计的乐趣理论》",
	},
	{
		quote: "读游戏设计文档不如玩一个原型。玩一个原型不如让一个陌生人试玩。",
		author: "本·弗莱（Ben Fry）",
		source: "交互设计 / 原型化方法",
	},
];
