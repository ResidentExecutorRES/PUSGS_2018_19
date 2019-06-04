using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class PassangerType
    {
        public PassangerType()
        {
        }

        public PassangerType(string name)
        {
            Name = name;
        }

        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
        
    }

    public enum PassangerTypeEnum
    {
        Student,
        Pensioner,
        Default,
        None
    }
}