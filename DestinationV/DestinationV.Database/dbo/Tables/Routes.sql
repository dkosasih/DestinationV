CREATE TABLE [dbo].[Routes] (
    [Id]            NVARCHAR (450) NOT NULL,
    [OriginId]      NVARCHAR (450) NULL,
    [DestinationId] NVARCHAR (450) NULL,
    [DepartUtc]     DATETIME       NOT NULL,
    CONSTRAINT [PK_Routes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Routes_Places_DestinationId] FOREIGN KEY ([DestinationId]) REFERENCES [dbo].[Places] ([Id]),
    CONSTRAINT [FK_Routes_Places_OriginId] FOREIGN KEY ([OriginId]) REFERENCES [dbo].[Places] ([Id])
);


GO
CREATE NONCLUSTERED INDEX [IX_Routes_DestinationId]
    ON [dbo].[Routes]([DestinationId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Routes_OriginId]
    ON [dbo].[Routes]([OriginId] ASC);

