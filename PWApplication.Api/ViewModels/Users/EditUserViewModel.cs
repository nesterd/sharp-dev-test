using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.ViewModels.Users
{
    public class EditUserViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
