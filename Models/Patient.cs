using System.ComponentModel.DataAnnotations;

namespace CW.Models
{
    public class Patient
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Sex { get; set; }
        [Required]
        public int YearOB { get; set; }
        public List<string> Symptoms { get; set; }
    }
}
