---
title = "Urbit Explained"
description = "We think the internet can't be saved."
---

We think the internet can't be saved. The way things are going, MEGACORP will always control our apps and services because we can no longer run them ourselves.

The only way out of this mess is with a completely new platform that's owned and controlled by its users.

Urbit is a new OS and peer-to-peer network that's simple by design, built to last forever, and 100% owned by its users. Under the hood, Urbit is a clean-slate software stack compact enough that an individual developer can understand and control it completely.

We built this new stack to give people a single integrated tool for communicating and building communities – a tool they can trust, control, and extend to their liking. We want to do away with the terrible user experience of the current 'frankenstack' of apps and services that we all use today.

Urbit is designed to become an effective, customizable productivity tool for collaborators, and a calm noninvasive communication tool for friends and families.

This probably sounds crazy, so let's get concrete and talk about (1) Urbit as a piece of technology and (2) Urbit as a user experience.

## Technology

Technically, Urbit is two components: Urbit OS and Urbit ID. Both are completely open source and MIT licensed.

{% graphic src="/media/overview_graphic.svg" alt="Urbit OS" / %}

**Urbit OS** is a new, carefully architected software stack: a VM, programming language and kernel designed to run software for an individual.

Urbit OS is a program that runs on almost any cloud server, most laptops and many phones: anything with Unix and an internet connection. Urbit OS is completely sealed from the system it runs on, sort of like WASM or the JVM. We sometimes call it an 'overlay OS'.

In an Urbit world, each person has their own Urbit OS node, or 'urbit'. Your urbit is secure and private to you and entirely under your control. When you want to connect with others, you connect to their urbit directly — rather than going through a centralized service.

If you're curious to dive even deeper into Urbit OS, feel free to skip ahead.

**Urbit ID** is an identity and authentication system specifically designed to work with Urbit OS. When you boot or log in to Urbit OS, you use your Urbit ID.

Your Urbit ID is a short, memorable name (like ~ravmel-ropdyl) that's a username, network address and crypto wallet all in one. It's registered on a blockchain, you own it with a key and no one can take it away from you. Urbit IDs are cryptographic property.

Urbit IDs aren't money, but they are scarce, so each one costs something. This means that when you meet a stranger on the Urbit network, they have some skin in the game and are less likely to be a bot or a spammer.

## Experience
We want Urbit to be a single, simple interface for your whole digital life.

Over the years, Urbit has been built in public as an open source project. Anyone can join the network and check out what we're up to. It's a bit like signing on to IRC in the early 90s.

In early 2020, Tlon released Urbit OS 1, now called Landscape: a minimal interface for group communication, and our first complete interface. Landscape is a tool to chat, share notes and links, and stay connected.

Over time, Urbit will grow into a system that can bring together all our different modes of communicating: chat, payments, documents, images, biometric data. We want individuals and their communities to be able to both control their software in fact, through the source code, and in action, through a simple interface.

We want to leave behind a world of apps and services for one where we can bring everything together in one place. And, in doing so, ordinary users can create customized digital environments for their friends and communities.

To see how we're going to get there, let's walk through these two pieces of new technology individually, Urbit OS and Urbit ID. We'll then talk about our vision for the future and how we'll get there.

For technical people, it's important to note that Urbit as a stack is in no way required to be used together. Don't like our client? Feel free to build your own. Just like the Urbit ID system? No problem — use it!

Ultimately, we think that new technology is most likely to get adopted if it can provide a much, much better user experience. So that's what we're focusing on creating.

# Urbit OS {#urbit-os}

For the most part, we use our laptops simply as access points to MEGACORP services. Our phones are the same. These services are amazing and convenient. But for that convenience we've traded away control, ownership and privacy. The way we live our digital lives is completely out of our hands.

Today's MEGACORP monopolies retain their control because of one central technical advantage: they make the server side usable.

Urbit OS is built to break these monopolies at this central point of control. Urbit OS makes the server side usable for individuals without the need for MEGACORP to run their software.

We've already been through this before. In 1974 a computer was a mainframe the size of a room and was shared by hundreds of people. By 1984 a computer was the size of a desk and everyone had their own PC. The PC was more flexible and more fun, so it won by a wide margin. Then, with the rise of the internet, the PC's flexibility slowly became irrelevant.

Today, we're more or less back to the timesharing model of the 1970s. Urbit OS is the PC to MEGACORP's mainframe. It's more flexible, more fun, and most of all, poised to capture the everyday creativity of the individual.

Let's talk about how we think we're going to pull this off from a technical standpoint, and our vision for using Urbit.

### Architecture

Urbit OS is a completely new, carefully architected software stack: a VM, programming language, and kernel designed to run software for an individual. Urbit OS is a program that runs on almost any cloud server, most laptops and many phones: anything with Unix and an internet connection.

{% image src="https://media.urbit.org/site/overview/overview-os.png" / %}


The main thing to understand about our 'overlay OS', as we call it, is that the foundation is a single, simple function. This function is the Urbit OS virtual machine. We call it 'Nock'. The entire Urbit OS system compiles down to Nock, and Nock is just 33 lines of code.

Nock is similar in spirit to WASM or the JVM: it's a uniform machine code for every Urbit ship. A frozen foundation makes for some nice features:

The state of your Urbit OS is a pure function of its event history. It's auditable, inspectable, repeatable. You can actually trust it. Writing decentralized apps becomes vastly simpler than in the old world, since every node computes exactly the same way. The entire Urbit OS stack, from programming language to applications, is upgradeable over the network. For ordinary users, this makes for almost no system administration.

Since Nock is a protocol for computing itself, any two nodes on the Urbit network can easily share data, communicate and connect their software. 20th century systems could never do this without a MEGACORP acting as the intermediary.

On top of this tiny VM we built a self-hosting, purely functional programming language, a kernel written in that language and a set of kernel modules that serve all the needs of personal computing. Specifically: a filesystem, build system, application sandbox, secret storage, web server, terminal driver and a networking protocol.

This sounds like a lot — but the whole stack is incredibly compact. The whole system clocks in at around 50K lines of code. We've seen individual developers understand the entire thing. Who is the last person you met that actually understands their entire computer? Urbit OS is like the 1968 Porsche 911 of operating systems: extremely simple, elegant, and built for the individual.

But why did we build all this technology?

First and foremost, to deliver a better user experience. Urbit OS alone is just a new layer for personal computing in the cloud. But with this new layer we open up the possibility of building a completely unified interface for people to compute in the cloud.

From a broader perspective, it's clear that connected computing is important and that it's here to stay. We just want it to be as calm, simple and reliable as possible, and we don't think that can happen using existing technology.

All of Urbit is built to function as a single stack, and we think that building a useful product is the best way to mature the system as a whole. That said, each component of this system can be used on its own. Don't like our client? That's okay, you can build your own. Don't want to use Urbit OS? No problem — you can use Urbit ID as an authentication system for some other OS, or for anything, really.

# Urbit ID {#urbit-id}

Assuming Urbit OS is simple enough for an ordinary user to own and operate, how do they log in? How do people identify one another on this new network? When people want to get data, files and messages to one another, how do they do it? And how do we prevent spam?

Urbit ID is the answer to all these questions. Urbit ID is a decentralized addressing and public key infrastructure designed for Urbit OS.

Let's talk first about what an Urbit ID is and what it does. Then we'll cover our design goals and how the system works overall.

{% image src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-cards%402x.png" / %}

### Summary

Your Urbit ID is a short, four-syllable name like ~ravmel-ropdyl that you own with an eight-syllable master passkey like ~palfun-foslup-fallyn-balfus. This name and key lets you log into Urbit OS, and it's used to encrypt packets you send over the Urbit network. Soon it will also be a master key that allows holding and sending of Bitcoin and other cryptocurrencies. Your Urbit ID and passkey belong to you like any other cryptographic assets. No one can take them away from you (just make sure to store the key safely).

The Urbit ID registry is live and deployed to the Ethereum blockchain. Urbit ID isn't specifically wedded to Ethereum – someday we'd like it to be hosted by Urbit OS itself. Also, Urbit ID is the only component of the stack using Ethereum – your Urbit OS node is hosted wherever you choose. The primary function of the Urbit ID registry is to keep track of who owns what, to specify which keys are associated with which names, and to enforce the rules of address distribution.

Each Urbit ID is really just a number. From that number we generate a pronounceable name and a visually identifiable sigil. ~dalwel-fadrun is 3,509,632,436, for example.

Urbit IDs are distributed by a sponsorship tree. At the top of the tree are 2^8^ (256) galaxies. Each galaxy issues 2^8^ stars, making a total of 2^16^ (65K). Stars then each can issue 2^16^ planets, making for 2^32^ (~4B). As you might expect, each planet issues 2^32^ moons.

{% image src="https://media.urbit.org/site/overview/overview-id.png" / %}

You can also call stars 'infrastructure nodes' and galaxies 'governance nodes', since those are more descriptive names for their roles. Stars help route packets, kind of like an ISP. And galaxies are a bit like DNS root servers or ICANN members. The difference, of course, is that Urbit IDs are owned cryptographically by many different people and accrue reputation independently.

### Design

At a high level, there are three important things to understand about the overall Urbit ID system design.

First, scarcity: there are only 2^32^ (~4B) Urbit IDs, so they cost something. Since they cost something, people are less likely to use them to spam or abuse the network. When you meet a stranger with an Urbit ID, you know they have some skin in the game (even without leaking personal data in either direction). That said, each Urbit ID is purely pseudonymous, so ~dalwel-fadrun for example, is proof of some stake in the network, but not much more.

Second, decentralization: Urbit IDs are distributed by a sponsorship tree. Each sponsor issues a fixed number of addresses. Since there are lots of sponsors, there are lots of ways to get an Urbit ID — not just one central authority. Once you get one, it's yours forever.

One point that's useful to understand about sponsors is that while Urbit IDs always need a sponsor, or parent node on the network (primarily for peer discovery), it's always possible to change sponsors and sponsors can always reject children. This means bad actors can be banned and abusive sponsors can be ignored. We think this strikes a nice balance between accountability and freedom.

Third, governance: galaxies (the top of the sponsorship tree) form a senate that can upgrade the logic of the Urbit ID system by majority vote. We think Urbit ID will last for quite a long time, but if it ever needs to be updated, the galaxies can vote to approve, reject, or propose changes to the contracts. Code may be law, but ultimately we acknowledge that human judgment can't be factored out.

The Urbit ID sponsorship tree is not intended to be a social system in any way. Interactions between people and communities on the Urbit network are peer-to-peer, entirely organic and completely uncontrolled by the address hierarchy. Urbit ID is simply an authentication substrate upon which reputation and communication systems can be built. (We've even considered renaming stars and galaxies 'infrastructure' and 'governance' nodes, respectively.)

Your relationship with your sponsor should be sort of like your ISP or a utility provider: a passive, non-invasive relationship. If it isn't to your liking, moving to a new sponsor is very easy.

### Digital Land

Urbit IDs are property, and we think of the entire registry of Urbit IDs as a vast territory of digital land.

{% image src="https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-sigils%402x.png" / %}

The scarcity of Urbit ID address space gives it value and that in turn helps bootstrap decentralization even while the project is young. Broad distribution is important – if Urbit is going to last a long time and succeed as neutral infrastructure, it has to be owned and controlled by a wide variety of people.

When we launched the Urbit ID system, in January of 2019, there were a couple thousand different star and galaxy holders acting as stewards of this digital land. Since then, that number has been steadily on the rise.

Ultimately, we want your Urbit ID to feel like a civilizational key. If your Urbit ID were a piece of hardware, you could tap it to unlock a door, swipe it to buy a coffee, and plug it into any computer to log in. Your Urbit ID should be a unique, beautiful object that's both an address and a wallet. It's a key to a secret club and the ticket to your digital life.

If you're curious to see exactly how this system works, the code is of course [open source](https://github.com/urbit/urbit). Including the source for our [phonemic naming system](https://github.com/urbit/urbit-ob/blob/master/src/internal/co.js) and the [visual representations](https://github.com/urbit/sigil-js). There's even a [Figma plugin](https://github.com/urbit/sigil-figma-plugin) for using them. There's also an interface for interacting with Urbit ID whose [source is open](https://github.com/urbit/bridge), too. Since the Urbit ID registry is live and deployed you can even [look at the chain](https://github.com/urbit/azimuth#live-contracts).

# History {#history}

Urbit is an open-source project that anyone can work on. The Urbit Foundation, a non-profit organization, is charged with shepherding the network toward a successful future. [Tlon](https://tlon.io/) was the first private company founded for the purposes of working on Urbit, back in 2013. But now there are several more. These include [Tirrel](https://tirrel.io/), [Native Planet](https://www.nativeplanet.io/), [Red Horizon](https://redhorizon.com/), and others. Beyond that, an ecosystem has sprung up around Urbit that includes [funds](https://assembly.capital/), [DAOs](https://labyrinthdao.io/), and [publications](https://marsreview.org/). And of course there are everyday contributors, many of whom have received [grants](https://urbit.org/grants) from the Urbit Foundation.

Let's talk first about these individual groups within the Urbit community, then about the history of the project and how it came to be.

### Organizations

The [Urbit Foundation](https://urbit.org/) was formally established in 2021 when it split off from Tlon. The Foundation leads core development, education, communications, runs the Urbit grants program, maintains [urbit.org](https://urbit.org/) and Urbit-related media, and organizes events like [Assembly](https://assembly.urbit.org/).

[Tlon Corporation](https://tlon.io/) was founded in 2013 to bootstrap Urbit. Tlon provides a mobile app "Tlon" which serves as the communication suite for Urbit, and, as of 2024, offers free hosting and Urbit planets for anyone who wants to get on the network.

[Tirrel Corporation](https://tirrel.io/) was founded in 2021 and is currently building a Lightning wallet for using Bitcoin on Urbit.

Founded in 2022, [Native Planet](https://www.nativeplanet.io/) has begun the immensely ambitious task of building hardware for Urbit.

[Zorp](http://zorp.io/), founded in 2022, builds Nockchain, a Layer 1 proof of work blockchain built using zero-knowledge proofs.

Spun out of the redoubtable crypto company Chorus One, in 2023 [Red Horizon](https://redhorizon.com/) began providing hosting services and developer tools for Urbit.

Founded in 2023, [Alphabet](https://tlon.network/lure/~sarmyn-samnym/alphabet) is building a peer-to-peer prediction market on Urbit leveraging the network's decentralized structure and built-in reputation system.

Urbit's community of contributors and core developers has been steadily contributing to the code base since before the Urbit Foundation existed, and they're still going strong. They can primarily be found on Urbit itself, in the Urbit Community ([~bitbet-bolbel/urbit-community](https://urbit.org/groups/~bitbet-bolbel/urbit-community)), the [urbit-dev](https://groups.google.com/a/urbit.org/g/dev?pli=1) mailing list and on [GitHub](https://github.com/urbit). See also The Urbit Foundation's public group at [~halbex-palheb/uf-public](https://urbit.org/groups/~halbex-palheb/uf-public).

### Timeline

In the beginning, Urbit was just a few people with the right combination of imagination and discipline to try to rebuild computing.

**2002**

Urbit starts as an open-ended personal project. An "independent study PhD" to reinvent computing for a network-centric world.

**2008**

Nock, the foundation of Urbit, works. Coming in at 32 lines of code, that's 1 line of code every two months.

**2012**

Hoon, Urbit's programming language, compiles itself to Nock. Writing Hoon is much easier than writing Nock.

**2013**

Arvo, Urbit's OS kernel, boots and the first live Urbit network is started with a command-line chat.

**2014**

Tlon is founded to help support Urbit development (and is < 8 people for the next four years).

**2015**

Urbit has its first web interface and serves its own website.

**2016**

The first sale of Urbit address space sells out in four hours.

**2017**

Urbit's test network runs for ten months without a reboot. Urbit's first private sale of address, shared only with its mailing list, sells out in six hours — limit two per person.

**2018**

Tlon sells about 8% of its stake in the network to accelerate Urbit development.

**2019**

Tlon spends the year stabilizing Arvo and building Landscape.

**2021**

Tlon hosts the first Urbit Assembly and the Urbit Foundation is formally organized.

**2022**

The Urbit Foundation's split from Tlon becomes complete, and UF organizes [Urbit NYC](https://urbit.org/groups/~ladtem-filmyr/urbit-ny-week) and [Assembly 2022](https://www.youtube.com/playlist?list=PLYGEMSwLguIGfxboRkv38sDeXH71koyET) in Miami while launching the Hoon School Live educational program, and updating [the documentation](https://docs.urbit.org).

**2023**

The Urbit Foundation takes over core development of Urbit and organizes the Volcano Summit, a conference for Urbit developers in El Salvador. Later in the year, [Assembly Lisboa](https://www.youtube.com/playlist?list=PLYGEMSwLguIF9wPzEoBr_MV3qR_mFSfXy) is our biggest event yet, drawing developers, projects, writers, artists, and Urbit enthusiasts from all over the world.

**The Future**

There's a lot to be excited about. Ares, the new Urbit runtime, will make Urbit far faster and greatly increase its storage capacity. A full-stack rewrite of Urbit's networking aims to increase throughput 100–1000x. Free hosting at a larger scale will allow larger quantities of users to join the network. A slew of new Urbit companies are working on everything from Lightning wallets on Urbit to Minecraft-like peer-to-peer games to full-fledged Urbit social networks. Several teams are vying to build the first Urbit blockchain. And all the while, enthusiasm among the community remains high, and Urbit companies are as dedicated and focused as ever.
