import React from 'react';
import { ChevronRight, Search, Bell, MessageCircle, User } from 'lucide-react';
import { NotificationPopover } from '../cases/NotificationPopover';
import { ChatNotificationPopover } from '../cases/ChatNotificationPopover';
import { EditProfilePopover } from '../cases/EditProfilePopover';
import { Link, useLocation } from 'react-router-dom';

export const TopBar = () => {


    const location = useLocation();

    const breadcrumbMap = {
        "/": "Home",
        "/dashboard": "Dashboard",
        "/medical": "Medical Device",
        "/hospitals": "Hospitals",
        "/surgeons": "Surgeons",
        "/team": "Team",
        "/login": "Login",
        "/register": "Register",
        "/test": "Test Page",
        "/mergeallfortest": "Merge Test",
        "/track": "Track Task",
        "/teammember_view": "Team Member View",
    };

    // Split pathname into segments
    const pathnames = location.pathname.split("/").filter((x) => x);



    return (
        <div className="h-14 border-b flex items-center justify-between px-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600">
                <Link to="/" className="text-gray-600 hover:underline">OssFlow</Link>
                {pathnames.length > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
                {pathnames.map((value, index) => {
                    // Current path up to this index
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    // Hardcode Cases folder for specific paths
                    const folderBefore = ["medical", "hospitals", "surgeons"].includes(value) ? "Cases" : null;

                    const breadcrumbLabel = breadcrumbMap[to] || value;

                    return (
                        <React.Fragment key={to}>
                            {folderBefore && index === 0 && (
                                <span className="flex items-center">
                                    <span className="text-gray-600">Cases</span>
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                </span>
                            )}
                            {isLast ? (
                                <span className="font-medium text-gray-900">{breadcrumbLabel}</span>
                            ) : (
                                <span className="flex items-center">
                                    <Link to={to} className="text-gray-600 hover:underline">{breadcrumbLabel}</Link>
                                    <ChevronRight className="w-4 h-4 mx-1" />
                                </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                <NotificationPopover />
                <ChatNotificationPopover />
                {/* <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                </div> */}
                <EditProfilePopover />
            </div>
        </div>
    );
}