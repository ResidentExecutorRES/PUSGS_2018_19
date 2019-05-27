using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public enum UserType { Student, Pensioner, None }
    public class User
    {   
        public int Id { get; set; }
        public String Name { get; set; } 
        public String LastName { get; set; } 
        public Address Address { get; set; } 
        public String Email { get; set; } 
        public bool Activated { get; set; }
        public String Image { get; set; }
        public UserType UserType { get; set; }
        public DateTime Birthaday { get; set; } 
    }
}