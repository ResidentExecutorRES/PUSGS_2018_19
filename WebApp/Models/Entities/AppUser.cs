using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class AppUser
    {
        [Key]
        public String Id { get; set; }
        public String Name { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public Address Address { get; set; }
        public bool Activated { get; set; }
        public String Image { get; set; }
        public PassangerType PassangerType { get; set; }
        public UserType UserType { get; set; }
        public DateTime? Birthaday { get; set; }
        public RoleCoefficient RoleCoefficient { get; set; }
        
    }
}