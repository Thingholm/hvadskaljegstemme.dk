using System.Runtime.InteropServices;
using Hvadskaljegstemme.Services;

namespace Hvadskaljegstemme.Tests;

public class UnitTest1
{
    [InlineData(new int[] { 1, 2, 3 }, new int[] { 1, 2, 3 }, true)]
    [InlineData(new int[] { 1, 2, 4 }, new int[] { 1, 2, 3 }, false)]
    [InlineData(new int[] { 1, 2, 3 }, new int[] { 1, 2, 4 }, false)]
    [InlineData(new int[] { 1, 2, }, new int[] { 1, 2, 3 }, false)]
    [InlineData(new int[] { 1, 2, 3 }, new int[] { 1, 2 }, false)]
    [Theory]
    public void Can_detect_an_invalid_answer(int[] answerIds, int[] billIds, bool expected)
    {
        var result = AnswerService.ValidateAnswers([.. answerIds], [.. billIds]);
        Assert.Equal(expected, result.IsSuccess);
    }
}
