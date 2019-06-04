using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class RoleCoefficient
    {
        public RoleCoefficient()
        {
            
        }

        public RoleCoefficient(double coefficient)
        {
            //PassangerType.Name = passangerType;
            Coefficient = coefficient;
            //PassangerTypeId = passangerType;
        }

        [Key]
        public int Id { get; set; }
        [ForeignKey("PassangerType")]
        public int? PassangerTypeId { get; set; }
        public PassangerType PassangerType { get; set; }
        public Double Coefficient { get; set; }
    }
}