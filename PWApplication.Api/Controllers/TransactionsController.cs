using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PWApplication.Api.Logic.Transactions;
using PWApplication.Api.ViewModels;
using PWApplication.Api.ViewModels.Transactions;
using PWApplication.Domain;
using PWApplication.Repository.Repositories.Transactions;
using PWApplication.Repository.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public TransactionsController(ITransactionRepository transactionRepository, IUserRepository userRepository, IMapper mapper)
        {
            _transactionRepository = transactionRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<List<TransactionViewModel>> GetList([FromQuery]string sorting)
        {
            var userId = User.Identity.Name;
            var user = await _userRepository.GetUser(userId);
            var transactionDomains = await _transactionRepository.GetList(userId);

            if (!transactionDomains.Any()) return new List<TransactionViewModel>();

            var earliestTime = transactionDomains.Min(x => x.Time);
            var startAmoun = await _userRepository.GetAmountForTime(user, earliestTime);

            var transactions = _mapper.Map<List<TransactionViewModel>>(transactionDomains);
            TransactionsService.PopulateCurrentData(transactions, userId, startAmoun);

            if(sorting != null)
                transactions = GetSortedTransactions(transactions, sorting);

            return transactions;
        }

        private List<TransactionViewModel> GetSortedTransactions(IEnumerable<TransactionViewModel> transactions, string sorting)
        {
            var sortingSplited = sorting.Split('-');
            var sortBy = sortingSplited[0];
            var sortDirection = sortingSplited[1];
            if(sortBy.Equals(nameof(TransactionViewModel.Time), StringComparison.InvariantCultureIgnoreCase))
            {
                return GetSortedByDirection(transactions, sortDirection, x => x.Time);
            }

            if (sortBy.Equals(nameof(TransactionViewModel.CorrespondentName), StringComparison.InvariantCultureIgnoreCase))
            {
                return GetSortedByDirection(transactions, sortDirection, x => x.CorrespondentName);
            }

            if (sortBy.Equals(nameof(TransactionViewModel.Amount), StringComparison.InvariantCultureIgnoreCase))
            {
                return GetSortedByDirection(transactions, sortDirection, x => x.Amount);
            }

            if (sortBy.Equals(nameof(TransactionViewModel.CurrentAccountAmount), StringComparison.InvariantCultureIgnoreCase))
            {
                return GetSortedByDirection(transactions, sortDirection, x => x.CurrentAccountAmount);
            }

            return transactions.ToList();

        }

        private List<TransactionViewModel> GetSortedByDirection<Tkey>(IEnumerable<TransactionViewModel> query, string sortingDirection, Func<TransactionViewModel, Tkey> keySelector)
        {
            return sortingDirection switch
            {
                "desc" => query.OrderByDescending(keySelector).ToList(),
                "asc" => query.OrderBy(keySelector).ToList(),
                _ => query.ToList(),
            };
        }

        [Route("options")]
        [HttpGet]
        public async Task<List<Option>> GetTransactionOptions()
        {
            var userId = User.Identity.Name;

            var transactions = await _transactionRepository.GetOnlyOutgoList(userId);

            return _mapper.Map<List<Option>>(transactions);
        }

        [HttpGet("{id}")]
        public async Task<TransactionViewModel> Get(int id)
        {
            return _mapper.Map<TransactionViewModel>(await _transactionRepository.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody]CreateTransactionViewModel transactionModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userId = User.Identity.Name;
            var user = await _userRepository.GetUser(userId);
            var currentAmount = await _userRepository.GetCurrentAmount(user);

            if (currentAmount < transactionModel.Amount) return BadRequest(new { amount = new[] { "Amount in transaction can not be less then current user`s amount. Max you can transfer is " + currentAmount.ToString("0.##") + " pw." } });
            var transaction = _mapper.Map<Transaction>(transactionModel);
            transaction.PayerId = userId;
            transaction.Time = DateTime.Now;

            await _transactionRepository.Add(transaction);

            return Ok();
        }
    }
}
