import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import SellerStatistics from '../../../components/Dashboard/Statistics/SellerStatistics'
import useRole from '../../../hooks/useRole'
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if( isRoleLoading) return <LoadingSpinner/>
  return (
    <div>
       {role === 'customer' && <CustomerStatistics />}
              {role === 'seller' && <SellerStatistics />}
              {role === 'admin' &&   <AdminStatistics />}
    </div>
  )
}

export default Statistics
