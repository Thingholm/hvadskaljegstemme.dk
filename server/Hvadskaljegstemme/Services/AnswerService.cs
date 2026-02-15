using Hvadskaljegstemme.Common;
using Hvadskaljegstemme.Models;
using Hvadskaljegstemme.Data;
using Hvadskaljegstemme.Dtos;
using Hvadskaljegstemme.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Hvadskaljegstemme.Services;

public class AnswerService(AppDbContext db)
{
    private readonly AppDbContext _db = db;

    public async Task<Result> PostAnswer(List<Answer> answers)
    {
        var billIds = await _db.Bills.Select(b => b.Id).ToListAsync();
        var answerIds = answers.Select(a => a.BillId).ToList();

        var validation = ValidateAnswers(answerIds, billIds);
        if (!validation.IsSuccess)
        {
            return validation;
        }

        var userAnswers = answers.Select(a => new UserAnswer
        {
            UserId = a.UserId,
            BillId = a.BillId,
            Vote = a.Vote,
        }).ToList();

        userAnswers.ForEach(ua => _db.UserAnswers.Add(ua));
        var rows_added = 0;
        try
        {
            rows_added = await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            return Result.Failure(new DBError(ex.Message));
        }

        return Result.Success();
    }

    public static Result ValidateAnswers(List<int> answerIds, List<int> billIds)
    {
        if (billIds.Count != answerIds.Count || billIds.Except(answerIds).Any())
        {
            return Result.Failure(new ValidationError("Invalid answers"));
        }

        return Result.Success();
    }
}