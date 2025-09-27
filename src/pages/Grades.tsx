import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, TrendingUp, TrendingDown, Award, FileText, Download } from "lucide-react";

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      course: "Mathematics",
      assignments: [
        { name: "Quadratic Equations", score: 92, maxScore: 100 },
        { name: "Calculus Basics", score: 88, maxScore: 100 },
        { name: "Problem Set 1", score: 95, maxScore: 100 },
      ],
      overallGrade: "A+",
      percentage: 91.7,
      trend: "up",
    },
    {
      id: 2,
      name: "Mike Chen",
      course: "Physics",
      assignments: [
        { name: "Newton's Laws", score: 85, maxScore: 100 },
        { name: "Lab Report 1", score: 92, maxScore: 100 },
        { name: "Motion Quiz", score: 78, maxScore: 100 },
      ],
      overallGrade: "A-",
      percentage: 85.0,
      trend: "up",
    },
    {
      id: 3,
      name: "Emma Wilson",
      course: "Chemistry",
      assignments: [
        { name: "Organic Compounds", score: 88, maxScore: 100 },
        { name: "Lab Safety Quiz", score: 95, maxScore: 100 },
        { name: "Molecular Structure", score: 82, maxScore: 100 },
      ],
      overallGrade: "B+",
      percentage: 88.3,
      trend: "stable",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      course: "Biology",
      assignments: [
        { name: "Cell Structure", score: 76, maxScore: 100 },
        { name: "DNA Replication", score: 84, maxScore: 100 },
        { name: "Ecosystem Essay", score: 79, maxScore: 100 },
      ],
      overallGrade: "B",
      percentage: 79.7,
      trend: "down",
    },
  ];

  const courses = ["all", "Mathematics", "Physics", "Chemistry", "Biology"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const getGradeBadge = (grade: string) => {
    const gradeColors = {
      "A+": "bg-success text-success-foreground",
      "A": "bg-success text-success-foreground",
      "A-": "bg-success text-success-foreground",
      "B+": "bg-warning text-warning-foreground",
      "B": "bg-warning text-warning-foreground",
      "B-": "bg-warning text-warning-foreground",
      "C+": "bg-accent text-accent-foreground",
      "C": "bg-accent text-accent-foreground",
    };
    return <Badge className={gradeColors[grade as keyof typeof gradeColors] || "bg-muted"}>{grade}</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="h-4 w-4" />;
  };

  const getOverallStats = () => {
    const totalStudents = filteredStudents.length;
    const averageGrade = filteredStudents.reduce((acc, student) => acc + student.percentage, 0) / totalStudents;
    const highPerformers = filteredStudents.filter(s => s.percentage >= 90).length;
    const needsAttention = filteredStudents.filter(s => s.percentage < 75).length;

    return { totalStudents, averageGrade, highPerformers, needsAttention };
  };

  const stats = getOverallStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grades</h1>
          <p className="text-muted-foreground">Track student performance and manage grades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Grades
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGrade.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.highPerformers}</div>
            <p className="text-xs text-muted-foreground">90%+ average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.needsAttention}</div>
            <p className="text-xs text-muted-foreground">&lt;75% average</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
          <CardDescription>Monitor individual student performance and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course === "all" ? "All Courses" : course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Student Grades Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Recent Assignments</TableHead>
                <TableHead>Overall Grade</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {student.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.assignments.slice(0, 2).map((assignment, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{assignment.name}: </span>
                          <span className={assignment.score >= 90 ? "text-success" : assignment.score >= 75 ? "text-warning" : "text-destructive"}>
                            {assignment.score}/{assignment.maxScore}
                          </span>
                        </div>
                      ))}
                      {student.assignments.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{student.assignments.length - 2} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getGradeBadge(student.overallGrade)}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{student.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={student.percentage} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{getTrendIcon(student.trend)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Grade
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;