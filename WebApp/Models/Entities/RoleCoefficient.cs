using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.Entities
{
    public class RoleCoefficient
    {
        public RoleCoefficient(PassangerType passangerType)
        {
            SetCoefficient(passangerType);
        }

        public int Id { get; set; }
        public PassangerType PassangerType { get; set; }
        public Double Coefficient { get; set; }


        public void SetCoefficient(PassangerType passangerType)
        {
            if (passangerType.Name == PassangerTypeEnum.Pensioner.ToString())
            {
                Coefficient = 0.6;

            }
            else if (passangerType.Name == PassangerTypeEnum.Student.ToString())
            {
                Coefficient = 0.5;

            }
                
            else
            {
                Coefficient = 1;
            }

            PassangerType = passangerType;
        }
    }
}