using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class RoleCoefficient
    {
        public RoleCoefficient()
        {
            SetCoefficient();
        }

        public int Id { get; set; }
        public PassangerType PassangerType { get; set; }
        public Double Coefficient { get; set; }


        public void SetCoefficient()
        {
            if (PassangerType.Name == PassangerTypeEnum.Pensioner.ToString())
                Coefficient = 0.6;
            else if (PassangerType.Name == PassangerTypeEnum.Student.ToString())
                Coefficient = 0.5;
            else
                Coefficient = 1;
        }
    }
}