# UniversityCommunityManagementSystem
# 高校社团管理系统

## 1.1 项目背景

随着校园文化的不断丰富，校园里的社团越来越多，有关社团的各种信息也成倍增长。很多社团都是用手工记录的方式和聊天App来管理社团内部事务，例如社团在招新时用纸张记录添加成员，在开展活动时用聊天App记录活动情况等，然后再进行总结和存档；而随着社团数量的增加, 这些手写记录和聊天App弊端也愈发明显，主要表现在不能及时地上传下达、学生意见的收集相对困难、活动批准时间较长、社团的相关文档传阅不方便等，这种管理方式就容易出现信息出错或丢失等缺点，而且时间一长,数据过多就会使以后查找信息及更新变得相当麻烦，因此很有必要开发一个高校社团管理系统来提高效率，实现社团成员基本信息的自动化管理。

高校社团管理系统方便社团的管理与宣传，可以有效地整合优质的线上线下资源。高校社团管理系统在管理方面，使社团的管理工作更加系统规范，信息的处理速度和准确性更高，方便社团信息资料归档，方便学校管理社团组织、方便社长安排活动，有效提升社团的管理效率。在学生方面，让大学生对社团及活动的开展有更加清晰的认识并能快速了解，增加对社团的知晓情况，提高学生参加社团积极性，增强社团与成员之间有效的沟通，从而丰富大学生的社团生活。

## 1.2 项目框架

高校社团管理系统分为前端及后端部分。

### 1.2.1 前端

前端使用的架构主要有React + React-Router V6 + Ant Design + MobX。

React 是一个用于构建用户界面的 JavaScript 库，它可以帮助开发人员快速构建可复用的组件。React 的组件化思想使得开发人员能够将复杂的界面拆分成多个独立的组件，从而提高代码的可维护性和可复用性。

React-Router V6 是一个用于管理 React 应用程序中路由的库，它可以帮助开发人员快速构建单页应用程序。在单页应用程序中，用户在浏览不同页面时不需要重新加载整个页面，而是通过动态更新页面内容来实现页面切换。这样可以提高用户体验，并且减少服务器压力。

Ant Design是一个基于 React 的 UI 组件库，它提供了丰富的组件，可以帮助开发人员快速构建漂亮的界面。Ant Design的组件都遵循统一的设计规范，并且提供了丰富的配置选项，可以满足不同场景下的需求。

Mobx 是一个状态管理库，它可以帮助开发人员管理应用程序中的状态。在复杂的应用程序中，状态管理是一个非常重要的问题。如果状态管理不当，会导致代码难以维护和调试。Mobx 通过提供一些简单易用的 API 来帮助开发人员管理状态，从而提高代码的可维护性。

这个框架将React + React-Router V6 + Ant Design + MobX结合起来，可以帮助开发人员快速构建高效、可维护的前端应用程序。它提供了一整套完整的解决方案，涵盖了前端开发中的各个方面，包括组件化开发、路由管理、状态管理和 UI 设计等。

### 1.2.2 后端

后端的主要技术架构为Node.js + Express + MySQL。

Node.js 是一个开源的、跨平台的 JavaScript 运行时环境，它作为服务端，不用担心线程问题，而且具有高性能I/O用于实时应用，方便系统功能的聊天实现。

Express 是一个基于 Node.js 的 Web 开发框架，它提供了丰富的 API 和中间件，可以帮助开发人员快速构建 Web 应用程序。它的设计简洁、易用，可以大大提高开发效率。

MySQL 是一个流行的关系型数据库管理系统，它提供了丰富的 SQL 语言支持，可以帮助开发人员快速构建复杂的数据模型。它具有高性能、可扩展性强等特点，可以满足大多数应用程序的需求。

使用 Node.js + Express + MySQL 搭建后端可以提高开发效率、简化开发流程，并且能够构建高性能、可扩展的应用程序。
