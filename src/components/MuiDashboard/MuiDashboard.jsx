import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function MuiDashboard({ technologies = [] }) {
  const [tabValue, setTabValue] = React.useState(0);

  const stats = {
    total: technologies.length,
    completed: technologies.filter((t) => t.status === "completed").length,
    inProgress: technologies.filter((t) => t.status === "in-progress").length,
    notStarted: technologies.filter((t) => t.status === "not-started").length,
    progress:
      technologies.length > 0
        ? Math.round(
            (technologies.filter((t) => t.status === "completed").length /
              technologies.length) *
              100
          )
        : 0,
  };

  const upcomingDeadlines = technologies
    .filter((t) => t.deadline && t.status !== "completed")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const recentTechnologies = technologies
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon color="success" />;
      case "in-progress":
        return <ScheduleIcon color="warning" />;
      default:
        return <RadioButtonUncheckedIcon color="disabled" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Панель управления
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
        >
          <Tab label="Обзор" />
          <Tab label="Статистика" />
          <Tab label="Активность" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ width: "100%", height: 110 }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Всего технологий
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                >
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ width: "100%", height: 110 }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Завершено
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  color="success.main"
                  sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                >
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ width: "100%", height: 110 }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  В процессе
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  color="warning.main"
                  sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                >
                  {stats.inProgress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ width: "100%", height: 110 }}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Не начато
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                >
                  {stats.notStarted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={2.4}>
            <Card sx={{ width: "100%", height: 110 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Общий прогресс
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stats.progress}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stats.progress}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={6} sx={{ minWidth: 0 }}>
            <Card sx={{ width: "100%", height: 250 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Предстоящие дедлайны
                </Typography>
                <List
                  dense
                  sx={{
                    maxHeight: 200,
                    overflow: "auto",
                    scrollbarGutter: "stable",
                  }}
                >
                  {upcomingDeadlines.length > 0 ? (
                    upcomingDeadlines.map((tech, index) => (
                      <React.Fragment key={tech.id}>
                        {index > 0 && <Divider />}
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            {getStatusIcon(tech.status)}
                          </ListItemIcon>
                          <ListItemText
                            primary={tech.title}
                            secondary={
                              tech.deadline
                                ? `Дедлайн: ${new Date(
                                    tech.deadline
                                  ).toLocaleDateString()}`
                                : ""
                            }
                            slotProps={{
                              primary: {
                                variant: "body2",
                                sx: {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: 1.3,
                                },
                              },
                              secondary: { variant: "caption" },
                            }}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ p: 2 }}
                    >
                      Нет запланированных дедлайнов
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={6} sx={{ minWidth: 0 }}>
            <Card sx={{ width: "100%", height: 250 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Недавно добавленные
                </Typography>
                <List
                  dense
                  sx={{
                    maxHeight: 200,
                    overflow: "auto",
                    scrollbarGutter: "stable",
                  }}
                >
                  {recentTechnologies.length > 0 ? (
                    recentTechnologies.map((tech, index) => (
                      <React.Fragment key={tech.id}>
                        {index > 0 && <Divider />}
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            {getStatusIcon(tech.status)}
                          </ListItemIcon>
                          <ListItemText
                            primary={tech.title}
                            secondary={tech.category || "Без категории"}
                            slotProps={{
                              primary: {
                                variant: "body2",
                                sx: {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  lineHeight: 1.3,
                                },
                              },
                              secondary: { variant: "caption" },
                            }}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ p: 2 }}
                    >
                      Нет технологий
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom>
          Детальная статистика
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Распределение по категориям
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  {[
                    "frontend",
                    "backend",
                    "mobile",
                    "devops",
                    "database",
                    "tools",
                  ].map((category) => {
                    const count = technologies.filter(
                      (t) => t.category === category
                    ).length;
                    return count > 0 ? (
                      <Box key={category}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2">{category}</Typography>
                          <Typography variant="body2">{count}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(count / technologies.length) * 100}
                        />
                      </Box>
                    ) : null;
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Статус выполнения
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip label="Завершено" color="success" />
                    <Typography variant="h6">{stats.completed}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip label="В процессе" color="warning" />
                    <Typography variant="h6">{stats.inProgress}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip label="Не начато" color="default" />
                    <Typography variant="h6">{stats.notStarted}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom>
          История активности
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Последние изменения
                </Typography>
                <Typography color="text.secondary">
                  Здесь будет отображаться история изменений статусов
                  технологий, добавление новых элементов и другие активности.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Активность по дням
                </Typography>
                <Typography color="text.secondary">
                  График активности будет отображаться здесь
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Статистика изменений
                </Typography>
                <Typography color="text.secondary">
                  Детальная статистика по изменениям статусов
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default MuiDashboard;
