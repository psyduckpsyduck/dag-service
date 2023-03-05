import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom.js';
import type { DocumentNode } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type InsertNodeInput = {
  embededNodes?: InputMaybe<Array<NodeInput>>;
  name: Scalars['String'];
  nextNodes?: InputMaybe<Array<NodeInput>>;
  placement: NodePlacement;
  referredNodeId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  insertNode?: Maybe<Node>;
};


export type MutationInsertNodeArgs = {
  input?: InputMaybe<InsertNodeInput>;
};

export type Node = {
  __typename?: 'Node';
  embededNodes?: Maybe<Array<Node>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  nextNodes?: Maybe<Array<Node>>;
};

export type NodeInput = {
  embededNodes?: InputMaybe<Array<NodeInput>>;
  name: Scalars['String'];
  nextNodes?: InputMaybe<Array<NodeInput>>;
};

export enum NodePlacement {
  Embeded = 'EMBEDED',
  Flat = 'FLAT'
}

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type NodeFieldsFragment = { __typename?: 'Node', id: string, name: string };

export type NodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NodeQuery = { __typename?: 'Query', node?: { __typename?: 'Node', id: string, name: string } | null };

export type InsertNodeMutationVariables = Exact<{
  input: InsertNodeInput;
}>;


export type InsertNodeMutation = { __typename?: 'Mutation', insertNode?: { __typename?: 'Node', id: string, name: string } | null };

export const NodeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NodeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;
export const NodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Node"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NodeFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NodeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;
export const InsertNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InsertNodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NodeFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NodeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Node(variables: NodeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NodeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NodeQuery>(NodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Node', 'query');
    },
    insertNode(variables: InsertNodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertNodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertNodeMutation>(InsertNodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'insertNode', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;