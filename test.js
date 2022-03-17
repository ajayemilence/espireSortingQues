const SortingResult = require('./ques');
// test cases
describe('Sorting by dependency [] with task  [] should return : \n result  = []', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult([], [])).toEqual([]);
    });
});
describe('Sorting by dependency [] with task  ["a", "b"] should return : \n result  = ["a", "b"]', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult(['a', 'b'], [])).toEqual(['a', 'b']);
    });
});
describe('Sorting for dependency ["a => b"]  with task  ["a", "b"] should return : \n result  = ["b", "a"]', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult(["a", "b"], ["a => b"])).toEqual(["b", "a"]);
    });
});
describe('Sorting for dependency ["a => b"]  with task  ["a", "b" ,"c", "d"] should return : \n result  = ["b", "a" , "d","c"]', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult(["a", "b" ,"c","d"], ["a => b" , "c => d"])).toEqual(["b", "a" , "d","c"]);
    });
});
describe('Sorting for dependency ["a => b" , "b => c"]  with task  ["a", "b" ,"c"] should return : \n result  = ["c", "b" , "a"]', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult(["a", "b" ,"c"], ["a => b" , "b => c"])).toEqual(["c", "b" , "a"]);
    });
});
describe('Sorting for dependency ["a => b" , "b => c" , "c => a"]  with task  ["a", "b" ,"c" , "d"] should return : \n result  = Error - this is a cyclic dependency', () => {
    it('Sorted by dependency', () => {
        expect(SortingResult(["a", "b" ,"c" , "d"], ["a => b" , "b => c" , "c => a"])).toEqual("Error - this is a cyclic dependency");
    });
});