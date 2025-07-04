USE [TodoAppDb]
GO
/****** Object:  Table [dbo].[ToDoItems]    Script Date: 6/30/2025 2:39:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ToDoItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DueDate] [date] NOT NULL,
	[IsComplete] [bit] NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastModifiedBy] [nvarchar](max) NULL,
	[LastModifiedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_ToDoItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/30/2025 2:39:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[PasswordHash] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ToDoItems] ON 

INSERT [dbo].[ToDoItems] ([Id], [Title], [Description], [DueDate], [IsComplete], [UserId], [CreatedBy], [CreatedDate], [LastModifiedBy], [LastModifiedDate]) VALUES (1, N'Todo 1', N'Todo 1 Description', CAST(N'2025-08-10' AS Date), 0, 1, N'1', CAST(N'2025-06-29T23:31:22.9935663' AS DateTime2), NULL, NULL)
INSERT [dbo].[ToDoItems] ([Id], [Title], [Description], [DueDate], [IsComplete], [UserId], [CreatedBy], [CreatedDate], [LastModifiedBy], [LastModifiedDate]) VALUES (2, N'Todo 2', N'Todo 1 Description', CAST(N'2025-08-12' AS Date), 1, 1, N'1', CAST(N'2025-06-29T23:31:22.9935686' AS DateTime2), NULL, NULL)
INSERT [dbo].[ToDoItems] ([Id], [Title], [Description], [DueDate], [IsComplete], [UserId], [CreatedBy], [CreatedDate], [LastModifiedBy], [LastModifiedDate]) VALUES (5, N'Buy groceries', N'Pick up milk and rice from the supermarket.', CAST(N'2025-07-05' AS Date), 1, 2, N'1', CAST(N'2025-06-30T00:37:56.1198570' AS DateTime2), N'1', CAST(N'2025-06-30T02:26:53.3108276' AS DateTime2))
INSERT [dbo].[ToDoItems] ([Id], [Title], [Description], [DueDate], [IsComplete], [UserId], [CreatedBy], [CreatedDate], [LastModifiedBy], [LastModifiedDate]) VALUES (8, N'Water the plants', N'Water only the flower plants', CAST(N'2025-07-02' AS Date), 0, 2, N'1', CAST(N'2025-06-30T01:15:58.2871107' AS DateTime2), N'1', CAST(N'2025-06-30T02:27:09.4510629' AS DateTime2))
SET IDENTITY_INSERT [dbo].[ToDoItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Email], [PasswordHash]) VALUES (1, N'testuser@email.com', N'#sdfsdfsdfsdf')
INSERT [dbo].[Users] ([Id], [Email], [PasswordHash]) VALUES (2, N'testuser1@todo.com', N'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=')
INSERT [dbo].[Users] ([Id], [Email], [PasswordHash]) VALUES (3, N'testuser2@todo.com', N'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[ToDoItems]  WITH CHECK ADD  CONSTRAINT [FK_ToDoItems_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ToDoItems] CHECK CONSTRAINT [FK_ToDoItems_Users_UserId]
GO
