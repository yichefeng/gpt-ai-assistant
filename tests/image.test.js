import {
  afterEach,
  beforeEach, expect, test,
} from '@jest/globals';
import {
  settings, handleEvents, getSession, removeSession,
} from '../app/index.js';
import storage from '../storage/index.js';
import { createEvents, TIMEOUT, USER_ID } from './utils.js';

beforeEach(() => {
  storage.initialize(settings);
});

afterEach(() => {
  removeSession(USER_ID);
});

test('COMMAND_IMAGE', async () => {
  const events = createEvents([
    'image 動物',
  ]);
  let results;
  try {
    results = await handleEvents(events);
  } catch (err) {
    console.error(err);
  }
  expect(getSession(USER_ID).lines.length).toEqual(1);
  const replies = results.map(({ messages }) => messages
    .map(({ originalContentUrl }) => originalContentUrl));
  expect(replies).toEqual(
    [
      [''],
    ],
  );
}, TIMEOUT);
