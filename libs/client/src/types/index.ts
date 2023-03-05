// @ts-nocheck
import * as TypeGraphQL from 'type-graphql';
export { TypeGraphQL };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type FixDecorator<T> = T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

@TypeGraphQL.ObjectType()
export class Edge {
  __typename?: 'Edge';

  @TypeGraphQL.Field(type => String)
  destinationNodeId!: Scalars['String'];

  @TypeGraphQL.Field(type => String)
  sourceNodeId!: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  insertNode?: Maybe<Node>;
};


@TypeGraphQL.ArgsType()
export class MutationInsertNodeArgs {

  @TypeGraphQL.Field(type => NodeInput)
  node!: FixDecorator<NodeInput>;

  @TypeGraphQL.Field(type => PositionInput, { nullable: true })
  position?: Maybe<PositionInput>;
};

@TypeGraphQL.ObjectType()
export class Node {
  __typename?: 'Node';

  @TypeGraphQL.Field(type => [Node], { nullable: true })
  enclosedNodes?: Maybe<Array<Node>>;

  @TypeGraphQL.Field(type => TypeGraphQL.ID)
  id!: Scalars['ID'];

  @TypeGraphQL.Field(type => String)
  name!: Scalars['String'];

  @TypeGraphQL.Field(type => [Edge], { nullable: true })
  outEdges?: Maybe<Array<Edge>>;
};

@TypeGraphQL.InputType()
export class NodeInput {

  @TypeGraphQL.Field(type => [NodeInput], { nullable: true })
  enclosedNodes?: Maybe<Array<NodeInput>>;

  @TypeGraphQL.Field(type => String)
  name!: Scalars['String'];

  @TypeGraphQL.Field(type => [NodeInput], { nullable: true })
  nextNodes?: Maybe<Array<NodeInput>>;
};

export const NodePlacement = {
  ENCLOSED: 'ENCLOSED',
  NEXT: 'NEXT'
} as const;

export type NodePlacement = typeof NodePlacement[keyof typeof NodePlacement];TypeGraphQL.registerEnumType(NodePlacement, { name: 'NodePlacement' });

@TypeGraphQL.InputType()
export class PositionInput {

  @TypeGraphQL.Field(type => NodePlacement)
  placement!: FixDecorator<NodePlacement>;

  @TypeGraphQL.Field(type => String, { nullable: true })
  referredNodeId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
};


@TypeGraphQL.ArgsType()
export class QueryNodeArgs {

  @TypeGraphQL.Field(type => TypeGraphQL.ID)
  id!: Scalars['ID'];
};
