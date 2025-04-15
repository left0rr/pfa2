<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">ダーリン shop</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.index')}}">
                        <i class="fas fa-sack-dollar"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.colors.index')}}">
                        <i class="fas fa-palette"></i>
                        Colors
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.sizes.index')}}">
                        <i class="fas fa-tag"></i>
                        Sizes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.coupons.index')}}">
                        <i class="fas fa-ticket"></i>
                        Coupons
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.products.index')}}">
                        <i class="fas fa-barcode"></i>
                        Products
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.orders.index')}}">
                        <i class="fas fa-bag-shopping "></i>
                        Orders
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page" href="{{route('admin.users.index')}}">
                        <i class="fas fa-users-gear "></i>
                        Users
                    </a>
                </li>
            </ul>
            <hr class="my-3">
            <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                    <a class="nav-link pastel-nav-link text-danger" href="#" onclick="document.getElementById('AdminLogoutForm').submit()">
                        <i class="fas fa-sign-out-alt me-2"></i> Sign out
                    </a>
                    <form id="AdminLogoutForm" action="{{route('admin.logout')}}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            </ul>
        </div>
    </div>
</div>
