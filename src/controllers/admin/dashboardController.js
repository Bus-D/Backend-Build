import { Router } from 'express';
import { getUsersByProject, getProjectsByUsers } from '../../models/projects/projectModel.js';

const router = new Router();

const showDashboard = (req, res) => {
    res.render('admin/dashboard', {
        title: 'Admin Dashboard'
    });
}

const showClients = (req, res) => {
    
}