namespace CW.Models
{
    public class Diagnosis
    {
        public Issue Issue { get; set; }
    }

    public class Issue
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Accuracy { get; set; }
        public string Icd { get; set; }
        public string IcdName { get; set; }
        public string ProfName { get; set; }
        public int Ranking { get; set; }
    }
}