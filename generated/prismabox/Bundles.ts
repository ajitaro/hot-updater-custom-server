import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BundlesPlain = t.Object(
  {
    id: t.String(),
    platform: t.String(),
    target_app_version: t.String(),
    should_force_update: t.Boolean(),
    enabled: t.Boolean(),
    file_hash: t.String(),
    git_commit_hash: t.String(),
    message: __nullable__(t.String()),
    channel: __nullable__(t.String()),
    fingerprint_hash: __nullable__(t.String()),
    metadata: t.Any(),
    storage_uri: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const BundlesRelations = t.Object({}, { additionalProperties: false });

export const BundlesPlainInputCreate = t.Object(
  {
    platform: t.String(),
    target_app_version: t.String(),
    should_force_update: t.Optional(t.Boolean()),
    enabled: t.Optional(t.Boolean()),
    file_hash: t.String(),
    git_commit_hash: t.String(),
    message: t.Optional(__nullable__(t.String())),
    channel: t.Optional(__nullable__(t.String())),
    fingerprint_hash: t.Optional(__nullable__(t.String())),
    metadata: t.Any(),
    storage_uri: t.String(),
  },
  { additionalProperties: false },
);

export const BundlesPlainInputUpdate = t.Object(
  {
    platform: t.Optional(t.String()),
    target_app_version: t.Optional(t.String()),
    should_force_update: t.Optional(t.Boolean()),
    enabled: t.Optional(t.Boolean()),
    file_hash: t.Optional(t.String()),
    git_commit_hash: t.Optional(t.String()),
    message: t.Optional(__nullable__(t.String())),
    channel: t.Optional(__nullable__(t.String())),
    fingerprint_hash: t.Optional(__nullable__(t.String())),
    metadata: t.Optional(t.Any()),
    storage_uri: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const BundlesRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const BundlesRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const BundlesWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          platform: t.String(),
          target_app_version: t.String(),
          should_force_update: t.Boolean(),
          enabled: t.Boolean(),
          file_hash: t.String(),
          git_commit_hash: t.String(),
          message: t.String(),
          channel: t.String(),
          fingerprint_hash: t.String(),
          metadata: t.Any(),
          storage_uri: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Bundles" },
  ),
);

export const BundlesWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              platform: t.String(),
              target_app_version: t.String(),
              should_force_update: t.Boolean(),
              enabled: t.Boolean(),
              file_hash: t.String(),
              git_commit_hash: t.String(),
              message: t.String(),
              channel: t.String(),
              fingerprint_hash: t.String(),
              metadata: t.Any(),
              storage_uri: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Bundles" },
);

export const BundlesSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      platform: t.Boolean(),
      target_app_version: t.Boolean(),
      should_force_update: t.Boolean(),
      enabled: t.Boolean(),
      file_hash: t.Boolean(),
      git_commit_hash: t.Boolean(),
      message: t.Boolean(),
      channel: t.Boolean(),
      fingerprint_hash: t.Boolean(),
      metadata: t.Boolean(),
      storage_uri: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BundlesInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const BundlesOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      platform: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      target_app_version: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      should_force_update: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      enabled: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      file_hash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      git_commit_hash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      message: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      channel: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      fingerprint_hash: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      metadata: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      storage_uri: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Bundles = t.Composite([BundlesPlain, BundlesRelations], {
  additionalProperties: false,
});

export const BundlesInputCreate = t.Composite(
  [BundlesPlainInputCreate, BundlesRelationsInputCreate],
  { additionalProperties: false },
);

export const BundlesInputUpdate = t.Composite(
  [BundlesPlainInputUpdate, BundlesRelationsInputUpdate],
  { additionalProperties: false },
);
