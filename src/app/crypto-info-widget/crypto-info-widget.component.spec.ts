import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CryptoInfoWidgetComponent } from './crypto-info-widget.component'

describe('UserPollComponent', () => {
  let component: CryptoInfoWidgetComponent
  let fixture: ComponentFixture<CryptoInfoWidgetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoInfoWidgetComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoInfoWidgetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
