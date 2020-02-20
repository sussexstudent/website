import {PageComponentMap} from '@ussu/common/src/types/content';
import React from 'react';
import {KBRoot} from './templates/KBRoot';
import {KBCategory} from './templates/KBCategory';
import {KBAnswer} from './templates/KBAnswer';

export const contentTypeMapNative: PageComponentMap = {
  KBRootPage: KBRoot,
  KBCategoryPage: KBCategory,
  AnswerPage: KBAnswer,
  ReferencePage: KBAnswer,
};
