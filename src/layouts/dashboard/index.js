// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import { useMaterialUIController } from "context";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { PieChart } from "@mui/x-charts/PieChart";
import Footer from "examples/Footer";

// Configs
import configs from "config";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

// Dashboard components
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";

function Dashboard() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const { sales, tasks } = reportsLineChartData;
    //console.log(configs.footer.company);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon="weekend"
                                title="Bookings"
                                count={281}
                                percentage={{
                                    color: "success",
                                    amount: "+55%",
                                    label: "than lask week",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                icon="leaderboard"
                                title="Today's Users"
                                count="2,300"
                                percentage={{
                                    color: "success",
                                    amount: "+3%",
                                    label: "than last month",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon="store"
                                title="Revenue"
                                count="34k"
                                percentage={{
                                    color: "success",
                                    amount: "+1%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="Followers"
                                count="+91"
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: "Just updated",
                                }}
                            />
                        </MDBox>
                    </Grid> */}
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart
                                    color="info"
                                    title="Analytics"
                                    description="Description"
                                    date="time"
                                    chart={reportsBarChartData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Analytics"
                                    description={
                                        <>
                                            (<strong>+15%</strong>) x today.
                                        </>
                                    }
                                    date="time"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid> */}
                        {/* <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="completed tasks"
                                    description="Last Campaign Performance"
                                    date="just updated"
                                    chart={tasks}
                                />
                            </MDBox>
                        </Grid> */}
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <MDBox mb={3}>
                                <img
                                    src="https://st2.depositphotos.com/3889193/8014/i/450/depositphotos_80147336-stock-photo-business-teamwork.jpg"
                                    alt="Dashboard Image 1"
                                    style={{ width: "100%", borderRadius: "8px" }}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MDBox mb={3}>
                            <ComplexStatisticsCard
                                icon="person"
                                title="Welcome"
                                count="User"
                                percentage={{
                                    color: "success",
     }}
                            />
                            </MDBox>
                            <MDBox mb={3}>
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661284828052-ea25d6ea94cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Dashboard Image 3"
                                    style={{ width: "100%", borderRadius: "8px" }}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                {/* <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Projects />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <OrdersOverview />
                        </Grid>
                    </Grid>
                </MDBox> */}
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default Dashboard;
