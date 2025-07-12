import React, { useEffect, useState } from "react";
import {LuPlus} from "react-icons/lu";
import {CARD_BG} from "../../utils/data";
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchAllSessions = async() => {

  }

  const deleteSession = async (sessionData) => {

  }

  useEffect(() => {
    fetchAllSessions();
  }, [])
  return (
    <DashboardLayout>
     
    </DashboardLayout>
  )
}

export default Dashboard