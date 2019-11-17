using AutoMapper;
using PWApplication.Api.ViewModels;
using PWApplication.Api.ViewModels.Transactions;
using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Transaction, TransactionViewModel>()
                .IgnoreAllPropertiesWithAnInaccessibleSetter();
            CreateMap<User, Option>()
                .ForMember(d => d.label, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.value, o => o.MapFrom(s => s.Id));
            CreateMap<CreateTransactionViewModel, Transaction>();
            CreateMap<Transaction, Option>()
                .ForMember(d => d.label, o => o.MapFrom(s => $"{s.Time.ToShortDateString()} - {s.Recipient.Name} - {s.Amount.ToString("0.##")} pw."))
                .ForMember(d => d.value, o => o.MapFrom(s => s.Id.ToString()));
        }
        
    }
}
