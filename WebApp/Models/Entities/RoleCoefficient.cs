﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class RoleCoefficient
    {
        public RoleCoefficient()
        {
            
        }

        public int Id { get; set; }
        public PassangerType PassangerType { get; set; }
        public Double Coefficient { get; set; }
    }
}