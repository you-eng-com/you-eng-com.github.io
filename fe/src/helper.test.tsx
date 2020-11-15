import { splitWord } from './helper';

test('splitWord ', () => {
  expect(splitWord("aaa bbb")).toEqual(["aaa", " ", "bbb"]);
  expect(splitWord("aaa  bbb")).toEqual(["aaa", "  ", "bbb"]);
  expect(splitWord("Has this... ever happened to you?")).toEqual(["Has", " ", "this", "... ", "ever", " ", "happened", " ", "to", " ", "you", "?"]);
  expect(splitWord("011 99988 19991 1972 5...")).toEqual(["011 99988 19991 1972 5..."]);
  expect(splitWord("-You berk!")).toEqual(["-", "You", " ", "berk", "!"]);
  expect(splitWord("I don't know")).toEqual(["I", " ", "don't", " ", "know"]);
  expect(splitWord("My bollocks?!")).toEqual(["My", " ", "bollocks", "?!"]);
  expect(splitWord("You f......idiot!!")).toEqual(["You", " ", "f", "......", "idiot", "!!"]);
});
