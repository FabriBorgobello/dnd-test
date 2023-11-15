import { UniqueIdentifier } from '@dnd-kit/core';

type ContainerId = 'frontend' | 'backend' | 'database';

export interface Container {
  id: ContainerId;
  name: string;
}

export interface Language {
  id: UniqueIdentifier;
  name: string;
  type: ContainerId;
}
