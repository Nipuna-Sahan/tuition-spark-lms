import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Calendar, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Assignments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      course: "Mathematics",
      dueDate: "2024-01-25",
      totalStudents: 45,
      submitted: 38,
      status: "Active",
      type: "Homework",
      points: 100,
    },
    {
      id: 2,
      title: "Newton's Laws Lab Report",
      course: "Physics",
      dueDate: "2024-01-28",
      totalStudents: 38,
      submitted: 25,
      status: "Active",
      type: "Lab Report",
      points: 150,
    },
    {
      id: 3,
      title: "Organic Compounds Quiz",
      course: "Chemistry",
      dueDate: "2024-01-22",
      totalStudents: 42,
      submitted: 42,
      status: "Completed",
      type: "Quiz",
      points: 50,
    },
    {
      id: 4,
      title: "Cell Structure Essay",
      course: "Biology",
      dueDate: "2024-02-01",
      totalStudents: 31,
      submitted: 12,
      status: "Active",
      type: "Essay",
      points: 200,
    },
    {
      id: 5,
      title: "Calculus Problem Set",
      course: "Mathematics",
      dueDate: "2024-01-30",
      totalStudents: 45,
      submitted: 0,
      status: "Draft",
      type: "Problem Set",
      points: 75,
    },
  ];

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAssignment = () => {
    toast({
      title: "Assignment Created",
      description: "New assignment has been successfully created and assigned to students.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Active: { color: "bg-primary text-primary-foreground", icon: Clock },
      Completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
      Draft: { color: "bg-muted text-muted-foreground", icon: FileText },
      Overdue: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="mr-1 h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeColors = {
      "Homework": "bg-secondary",
      "Quiz": "bg-warning text-warning-foreground",
      "Lab Report": "bg-accent",
      "Essay": "bg-primary text-primary-foreground",
      "Problem Set": "bg-success text-success-foreground",
    };
    return <Badge className={typeColors[type as keyof typeof typeColors] || "bg-muted"}>{type}</Badge>;
  };

  const getSubmissionRate = (submitted: number, total: number) => {
    const rate = (submitted / total) * 100;
    return Math.round(rate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground">Create and manage assignments for your students</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>Set up a new assignment for your students.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">Course</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homework">Homework</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="lab">Lab Report</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="problem">Problem Set</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="points" className="text-right">Points</Label>
                <Input id="points" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment}>Create Assignment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {assignments.filter(a => a.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {assignments.reduce((acc, a) => acc + (a.totalStudents - a.submitted), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Submission Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round(
                assignments
                  .filter(a => a.status !== "Draft")
                  .reduce((acc, a) => acc + getSubmissionRate(a.submitted, a.totalStudents), 0) /
                assignments.filter(a => a.status !== "Draft").length
              )}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
          <CardDescription>Track and manage all your assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">ID: {assignment.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{getTypeBadge(assignment.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {assignment.submitted}/{assignment.totalStudents}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getSubmissionRate(assignment.submitted, assignment.totalStudents)}% submitted
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{assignment.points} pts</TableCell>
                  <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
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

export default Assignments;